<template>
    <main class="site-main" v-if="clinica" ref="componentRef">
        <UiBotonCita v-if="clinica.acf && clinica.acf.boton_cita" :data="clinica.acf.boton_cita" />

        <!-- Encabezado -->
        <section class="clinica grid grid-cols-16 gap-0 xl:p-0 min-h-fit">
            <Encabezado :data="clinica" />
            <NuxtLazyHydrate when-idle>

                <!-- Clínicas relacionadas -->
                <RelatedClinicas v-if="clinica.acf && clinica.acf.localizaciones"
                    :related="clinica.acf.localizaciones" />

                <!-- Intro -->
                <EntryText :data="clinica" />

            </NuxtLazyHydrate>
        </section>

        <!-- Cirugías Relacionadas -->
        <NuxtLazyHydrate when-idle>
            <Categories
                v-if="clinica.acf && clinica.acf.cirugias_relacionadas && clinica.acf.cirugias_relacionadas.categorias_home"
                :data="clinica.acf.cirugias_relacionadas" sectionId="cirugias" class="[&_.home__services]:!min-h-screen/75" />
        </NuxtLazyHydrate>

        <!-- Servicios de cirugía -->
        <NuxtLazyHydrate when-idle>
            <Acordeon v-if="clinica.acf && clinica.acf.acordeon_cirugias" :data="clinica.acf.acordeon_cirugias" />
        </NuxtLazyHydrate>

        <!-- Formulario Pide Cita -->
        <NuxtLazyHydrate when-idle>
            <!-- <FormsPiceCita class="mb-12 xl:mb-32" v-if="clinica.acf && clinica.acf.formulario"
                :portalId="String(clinica.acf.formulario.portalid)" :formId="clinica.acf.formulario.formid"
                :related="clinica.acf.clinicas_relacionadas" :zoom="clinica.acf.zoom" :lat="clinica.acf.lat"
                :lng="clinica.acf.lng" /> -->
            <section
                class="pidecita w-screen col-span-full grid grid-cols-16 grid-rows-2 lg:grid-rows-1 min-h-screen/70 py-0 lg:gap-0">
                <div class="col-span-full lg:col-span-11 min-h-screen/60">
                    <LazyElementsSingleGoogleMap :locations="clinica.acf.localizaciones" :zoom="15" />
                </div>
                <div id="formulario" class="half-right bg-blue-1 col-span-5">
                    <!-- <div class="map-info mb-12 [&>*]:!text-blue-1 [&>ul>li]:!text-blue-1 [&>ul>li]:list-none [&>ul]:border-t [&>ul]:border-blue-1/50 [&>ul]:pt-2 [&>*]:mb-2 [&>ul>li]:mb-0" v-html="content"></div> -->
                    <div class="form__wrapper">
                        <!-- <FormsCirugia :identificador="'map'" :portalId="portalId" :formId="formId" /> -->
                        <FormsCustomForm :identificador="'map'" :portalId="String(clinica.acf.formulario.portalid)" :formId="clinica.acf.formulario.formid" />
                    </div>
                </div>
            </section>
        </NuxtLazyHydrate>

        <!-- Doctors -->
        <NuxtLazyHydrate when-idle>
            <div v-if="clinica.acf && clinica.acf.dr_comment" class="grid grid-cols-12 sm:mb-20 gap-y-8 pt-20">
                <h2 class="col-[2/-2] text-center">Nuestro Equipo</h2>
                <!-- <ElementsDivider class="col-[2/-2]" /> -->
                <div v-if="doctorsWithComments.length > 0" class="col-[2/-2] grid grid-cols-12 gap-4">
                    <div class="overflow-hidden size-full flex flex-col items-center col-span-full lg:col-[1/7] border-y border-y-blue-1/25 pt-4"
                        v-for="({ doctor, comentario }, index) in doctorsWithComments" :key="doctor.ID">
                        <div
                            class="flex flex-col sm:flex-row justify-center items-center gap-x-6 text-center max-sm:pb-8">
                            <div class="w-full min-h-56 mb-8 sm:w-80  lg:aspect-square rounded-lg overflow-hidden">
                                <img loading="lazy" :src="doctor.featured_image" :alt="doctor.post_title"
                                    class="cover absolute object-center h-full max-w-none left-1/2 -translate-x-1/2"
                                    :aria-labelledby="'doctor-title-' + doctor.ID" />
                            </div>
                            <div class="w-full" v-if="doctor.post_title">
                                <!-- Título del doctor -->
                                <h3 class="text-clamp-xl text-left mb-2">
                                    <strong>{{ doctor.post_title }}</strong>
                                </h3>
                                <!-- Comentario del doctor -->
                                <p class="text-clamp-sm leading-tight mb-4 text-left">
                                    {{ comentario }}
                                </p>
                                <!-- Botón de enlace a la página del doctor -->
                                <UiButton :to="relativeDoctorLink(doctor.permalink)"
                                    class="button blue text-clamp-xs size-full rounded-2xl block uppercase !px-3 !py-1 w-fit h-fit">
                                    más información
                                </UiButton>
                            </div>
                        </div>
                    </div>
                    <div v-if="clinica.acf.descripcion_cirujanos"
                        class="col-span-full sm:col-[7/-1] sm:row-[1/3] text-left sm:text-center flex justify-center items-center text-nude-8 bg-blue-1 p-4 rounded-xl">
                        <p class="mb-0 text-balance text-clamp-lg">{{ clinica.acf.descripcion_cirujanos }}</p>
                    </div>
                </div>
                <div v-else>
                    <p>Cargando información del doctor...</p>
                </div>
            </div>
        </NuxtLazyHydrate>

        <!-- Premios -->
        <ElementsPremios />

        <!-- Content -->
        <NuxtLazyHydrate when-idle>
            <div class="tratamiento__content col-[1_/_span_16] py-2 px-0">
                <div class="panels w-full" v-if="clinica.acf && clinica.acf.tabs">
                    <section class="panel" :class="content.fondo" v-for="content in clinica.acf.tabs">
                        <figure class="panel__image" v-if="content.fondo != 'sin'">
                            <div v-if="content.fondo == 'vHorizontal'" class="video__player aspect-video">
                                <div class="size-full">
                                    <Player :videoId="content.video" />
                                </div>
                            </div>
                            <div v-else-if="content.fondo == 'vVertical'"
                                class="video__player max-w-full flex flex-col lg:flex-row gap-4 h-fit">
                                <div class="size-full lg:max-w-[60%] aspect-[9/16]"
                                    v-for="(videoItem, index) in content.videos" :key="index">
                                    <Player :videoId="videoItem.video" />
                                </div>
                            </div>
                            <img class="size-full object-cover object-center" loading="lazy"
                                v-else-if="content.fondo == 'imagen'" :src="content.side_image.url"
                                :srcset="content.side_image.srcset" :width="content.side_image.width"
                                :height="content.side_image.height" :alt="content.side_image.alt" />
                        </figure>

                        <div class="panel__content">
                            <h2 class="text-clamp-2xl mb-8">{{ content.heading }}</h2>
                            <div class="answer p-0">
                                <div class="answer__content [&>ul]:mt-6" v-html="content.content"></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </NuxtLazyHydrate>

        <!-- Google Reviews -->
        <section class="col-[2/-2] lg:col-start-2 lg:col-span-9 bg-transparent min-h-max px-8 xl:px-[calc(100%/16)]">
            <h2 class="h4 text-center">Nuestros pacientes opinan de EGOS</h2>
            <GoogleReviews :placeid="clinica.acf.placeid" />
        </section>
    </main>
</template>

<script setup>
import Encabezado from '~/components/cirugias/Encabezado.vue';
import EntryText from '~/components/cirugias/EntryText.vue';
import Categories from '~/components/home/Categories.vue';
import Acordeon from '~/components/home/Acordeon.vue';
import Player from '~/components/vimeo/player.vue';
import RelatedClinicas from '~/components/elements/RelatedClinicas.vue';
import GoogleReviews from '~/components/Ui/GoogleReviews.vue';
import SingleMap from '~/components/forms/SingleMap.vue'

const router = useRouter()
const route = useRoute();
const { $gsap: gsap } = useNuxtApp();

// Estados reactivos
const componentRef = ref(null)
const form = ref({ form_settings: null });
const isLoading = ref(false);
const errorMessage = ref("");


// Uso de `useAsyncData` para cargar los datos de la clínica
const { data: clinica, refresh: refreshClinica } = await useAsyncData(
    `clinica-${route.params.slug}`,
    async () => {
        try {
            const response = await getClinicas({ slug: route.params.slug });

            // Si no hay respuesta válida, retornar null
            if (!response || Object.keys(response).length === 0) {
                return null;  // Si no se encuentra la clínica, retornar null
            }

            return response;  // Retornar los datos si todo está bien
        } catch (error) {
            console.error(`Error fetching clinica ${route.params.slug}:`, error);
            return null;  // Retornar null en caso de error
        }
    },
    {
        watch: [() => route.params.slug]  // Observar cambios en el `slug` para recargar los datos
    }
);

// Observa el valor de `clinica` y redirige si es null
watchEffect(() => {
    if (!clinica.value) {
        // Redirigir a la página de error si no se encuentra la clínica
        router.push('/error');
    }
});


const categorias = computed(() => home?.acf?.cirugias_relacionadas?.categorias_home || [])

const { data: formData, refresh: refreshFormData } = await useAsyncData(
    'formSettings',
    async () => {
        try {
            const response = await egosSettings('form_settings');
            return response || {}; // Asegurarse de que siempre se retorne un objeto
        } catch (error) {
            console.error('Error fetching form settings:', error);
            return {}; // En caso de error, retornar un objeto vacío
        }
    }
);

const doctorsWithComments = ref([]);

// Asignar los datos de los doctores directamente desde `clinica.acf.doctores_relacionados`
if (clinica.value && clinica.value.acf?.dr_comment) {
    // console.log('doctor list:', clinica.value.acf.dr_comment);

    doctorsWithComments.value = clinica.value.acf.dr_comment.map(commentObj => ({
        doctor: commentObj.doctores_relacionados[0],
        comentario: commentObj.comentario
    }));
}

const relativeDoctorLink = (link) => {
    if (link) {
        const url = new URL(link);
        return url.pathname;
    }
    return '';
};

// console.log(route.params.slug[0]);

// Generar los JSON-LD de los doctores usando el composable
const doctorScripts = doctorsWithComments.value.flatMap(({ doctor }) => {
    const { injectDoctorData } = useDoctorsJson(doctor);  // Composable para generar JSON-LD
    const { doctorData, publicationElements } = injectDoctorData();

    return [
        doctorData && {
            type: 'application/ld+json',
            children: JSON.stringify(doctorData)
        },
        /* Activar si se quiere mostrar también las publicaciones del doctor en ld json */
        // ...publicationElements.map(publication => ({
        //     type: 'application/ld+json',
        //     children: JSON.stringify(publication)
        // }))
    ].filter(Boolean);
});

let tratamiento = clinica
const { generateBreadcrumbData } = useBreadcrumbData(tratamiento);
const breadcrumbJson = generateBreadcrumbData();

const { generateYoastHead } = useYoastHead(clinica);
const yoastHead = generateYoastHead();

// Obtener los premios del composable
const { awards } = useAwardsSchema();

// Convertir los premios a JSON-LD
const awardsJsonLd = JSON.stringify(awards);

useHead({
    script: [
        breadcrumbJson && {
            type: 'application/ld+json',
            children: JSON.stringify(breadcrumbJson),
        },
        // awardsJsonLd && {
        //     type: 'application/ld+json',
        //     children: awardsJsonLd
        // },
        // JSON-LD para los doctores
        ...doctorScripts
    ].filter(Boolean), // Filtra los valores nulos o undefined
    ...yoastHead,
});
</script>

<style scoped>
:deep(#cirugias) {
    @apply col-span-full;

    .home__services {
        @apply bg-nude-8 pt-0;
    }
}

:deep(.all-cirugias) {
    .accordion__list {
        @apply mt-6;
    }
}

:deep(.home__services) {
    @apply min-h-screen/75;
}

:deep(.clinicas__egos-map) {
    @apply rounded-none;
}

.panel {
    @apply grid grid-cols-16 gap-6 xl:gap-2 xl:mb-32 py-12;

    .panel__image {
        @apply h-fit rounded-xl overflow-hidden has-[img]:aspect-square has-[img]:col-[2/-2] has-[img]:row-start-1 sm:has-[img]:col-[9_/_span_7] gap-8;
    }

    .panel__content {
        @apply col-[2/-2] sm:col-start-2 sm:col-end-8 self-center;
    }

    &:nth-child(odd) {
        .panel__image {
            @apply h-fit rounded-xl overflow-hidden has-[img]:aspect-square has-[img]:col-[2/-2] has-[img]:row-start-1 sm:has-[img]:col-[2_/_span_7] gap-8;
        }

        .panel__content {
            @apply col-[2/-2] sm:col-start-10 sm:col-end-16 self-center;
        }
    }
}
</style>
