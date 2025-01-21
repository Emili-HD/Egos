<template>
    <div class="relative w-full h-full">
        <ClientOnly>
            <!-- Swiper Container -->
            <swiper-container ref="mapRef" :init="false" class="mapSlide size-full">
                <!-- Primer Slide (Estático) -->
                <swiper-slide class="w-full h-vh">
                    <img :src="mapAll" alt="Mapa general de EGOS" class="w-full h-full object-cover" />
                    <div
                        class="absolute bottom-28 left-0 right-0 mx-auto lg:left-[unset] lg:right-12 p-12 rounded-xl bg-white/25 backdrop-blur-xl w-[max(33vw,_360px)]">
                        <div class="[&>*]:text-blue-1">
                            <h4 class="text-2xl text-blue-1 mb-6">Mapa general de EGOS</h4>
                            <UiButton class="mt-4 blue" to="/nuestras-clinicas/">
                                <span class="text-nude-8">Ver todas las clínicas</span>
                            </UiButton>
                        </div>
                    </div>
                </swiper-slide>

                <!-- Un bucle para renderizar todas las imágenes -->
                <swiper-slide v-for="(image, index) in flatImages" :key="`image-${index}`" class="w-full h-vh">
                    <img :src="image.url" :alt="image.alt || 'Mapa de la clínica'" class="w-full h-full object-cover" />
                    <div
                        class="absolute bottom-28 left-0 right-0 mx-auto lg:left-[unset] lg:right-12 p-12 rounded-xl bg-white/25 backdrop-blur-xl w-[max(33vw,_360px)]">
                        <div class="[&>*]:!text-blue-1 [&>ul>li]:!text-blue-1 [&>ul>li]:list-none [&>ul]:border-t [&>ul]:border-blue-1/50 [&>ul]:pt-2 [&>*]:mb-2 [&>ul>li]:mb-0"
                            v-html="image.info"></div>
                    </div>
                </swiper-slide>
            </swiper-container>
        </ClientOnly>

        <!-- Lista de botones -->
        <div class="clinics p-8 flex flex-col-reverse z-10 absolute left-0 top-1/2 -translate-y-1/2">
            <ul v-for="(location, locationIndex) in locations" :key="`list-${location.id}`"
                class="hidden lg:flex flex-col list-none">
                <li v-for="(localizacion, index) in location.acf?.localizaciones" :key="`btn-${location.id}-${index}`"
                    class="mb-1">
                    <button
                        class="custom-btn m-0 py-1 px-3 font-light text-sm appearance-none cursor-pointer select-none text-nude-8 bg-blue-1 rounded-md"
                        @click="goToSlide(locationIndex, index)" v-html="localizacion.id"></button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>

    // Importaciones
    import { UiButton } from '#components';
import mapAll from '/images/egos-all.webp'

    // Props
    const props = defineProps({
        related: {
            type: Array,
            default: () => null,
        },
    });

    // Referencia al Swiper principal
    const mapRef = ref(null);

    // Obtener datos de las ubicaciones
    const { data: locations, error: locationsError } = await useAsyncData(
        'locations',
        async () => {
            const response = await getClinicas({
                ids: props.related && props.related.length > 0 ? props.related : null,
            });
            return response.filter(
                (clinica) =>
                    clinica.acf &&
                    !clinica.acf.destacar_post &&
                    !clinica.acf.destacar_post.includes('Destacado'),
            );
        },
    );

    // Función para obtener un array plano de imágenes
    const flatImages = computed(() =>
        locations.value.flatMap(location =>
            location.acf?.localizaciones.map(localizacion => ({
                url: localizacion.imagen_map?.url,
                alt: localizacion.imagen_map?.alt || '',
                info: localizacion.informacion,
            })),
        ),
    );

    // Configurar Swiper principal
    useSwiper(mapRef, {
        effect: 'fade',
        slidesPerView: 1,
        fadeEffect: {
            crossFade: true,
        },
    });

    // Método para calcular el índice real y navegar al slide correspondiente
    const goToSlide = (locationIndex, localizacionIndex) => {
        // Calcular el índice basado en la posición del slide estático
        let slideIndex = 1; // Comienza en 1 para el slide estático
        for (let i = 0; i < locationIndex; i++) {
            slideIndex += locations.value[i]?.acf?.localizaciones?.length || 0;
        }
        slideIndex += localizacionIndex;

        // Mover al slide calculado
        mapRef.value.swiper.slideTo(slideIndex);
    };
</script>


<style scoped>
    .swiper-slide {
        @apply flex justify-center items-center h-full z-0;
    }
</style>
