<template>
    <section class="intro">
        <div class="intro__image bg-cover bg-[75%] min-h-vh pb-12 lg:bg-center"
            :style="`background-image: url('${data.featured_image_data.url}');`">
            <div>
                <p class="intro__title">
                    <span class="!text-blue-1 text-clamp-4xl">Hazlo por ti</span><span id="a">Somos cirujanos</span>
                </p>
                <div
                    class="intro__content pl-8 lg:pl-16 text-blue-1 flex flex-col justify-center items-start gap-4 z-10 w-full">
                    <div class="heading mb-12">
                        <h1 class="!text-clamp-lg lg:!text-clamp-lg">EGOS | Clínica de cirugía plástica y reparadora
                        </h1>
                    </div>
                </div>
            </div>
            <div class="flex flex-col lg:flex-row justify-center items-center w-full z-20 gap-6 px-12 xl:px-16">
                <div v-for="tratamiento in featuredTratamientos" :key="tratamiento.id"
                    class="video-sample w-full max-w-[320px] sm:max-w-[70%] lg:max-w-[32%] xl:max-w-[33%] ">
                    <nuxt-link :to="formatLink(tratamiento.link)"
                        class="flex items-center bg-nude-8/40 backdrop-blur overflow-hidden rounded-xl min-w-[320px] xl:min-w-[30vw] shadow-lg">
                        <div class="p-0 h-full w-[30%] xl:w-1/3 aspect-square overflow-hidden">

                            <img v-if="tratamiento && tratamiento.acf && tratamiento.acf.imagen_cards"
                                class="absolute inset-0 w-full h-full object-cover object-center"
                                :src="tratamiento.acf.imagen_cards.sizes.calcula"
                                width="200"
                                height="200"
                                :alt="tratamiento.acf.imagen_cards.alt || `Tratamiento de ${tratamiento.acf.titulo} en Clínica Egos`" />
                        </div>
                        <div class="px-4 w-[70%] xl:w-2/3 flex justify-start items-center h-full">
                            <div class="w-full">
                                <h2 class="text-lg xl:text-xl font-medium mb-4">{{ tratamiento.acf.titulo }}</h2>
                                <div class="gold text-xs xl:text-clamp-sm !px-4">¡Calcula tu presupuesto!</div>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { getTratamiento } from '@/composables/useApi';

    const props = defineProps({
        data: {
            type: Object,
            required: true,
        }
    })

    const { data: featuredTratamientos, error } = await useAsyncData('featured-tratamientos', async () => {
        const tratamientos = await getTratamiento({ getAll: true });
        return tratamientos.filter(tratamiento =>
            tratamiento.acf?.destacar_post?.includes('featured')
        );
    });    

    const formatLink = (url) => {
        // Si la URL es completa, extraemos el path
        try {
            const { pathname } = new URL(url);
            return pathname;
        } catch (error) {
            // Si no es una URL válida, asumimos que ya es un path relativo
            return url;
        }
    };
</script>

<style lang="scss" scoped>
    .gold {
        @apply py-2 px-6 w-fit rounded-full text-white font-normal animate-gradient bg-gold-gradient-text bg-[length:300%_300%] [animation-play-state:paused] hover:[animation-play-state:running];
    }

    .intro {
        @apply min-h-vh;

        &__image {
            @apply flex flex-col justify-center items-start gap-8;

            &::after {
                @apply content-[''] absolute inset-0 size-full bg-white/30;
            }
        }
    }

    .girl {
        @apply h-vh w-screen object-cover object-[75%] xl:object-center absolute z-0 left-0;
    }

    .intro__title {
        @apply font-lora font-normal text-clamp-3xl text-balance lg:text-[8vw] xl:text-[3vw] text-blue-1 leading-[0.9] mb-8 mt-52 lg:mt-40 pl-8 lg:pl-16 text-left z-10;

        &>span {
            @apply text-gold-3 w-full block lg:inline-block
        }
    }

    .heading h1 {
        @apply text-clamp-2xl 2xl:text-clamp-lg font-nunito;
    }

    @media (min-width: 768px) and (max-width: 1366px) and (orientation: portrait) {
        .girl {
            @apply left-0;
        }
    }

    @media (min-width: 768px) and (max-width: 1180px) and (orientation: landscape) {
        .intro__title {
            @apply text-[6vw];
        }
    }
</style>
<!-- 81.60.175.100 -->
