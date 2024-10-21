<template>
    <section class="intro">
        <div class="intro__image">
            <UiImage :data="data" class="girl" :preload="true" />
            <div>
                <p class="intro__title">
                    <span class="!text-blue-1 text-clamp-4xl">Hazlo por ti</span><span id="a">Somos cirujanos</span>
                </p>
                <div
                    class="intro__content pl-8 lg:pl-16 text-blue-1 flex flex-col justify-center items-start gap-4 z-10 w-full">
                    <div class="heading mb-12">
                        <h1 class="">EGOS | Clínica de cirugía plástica y reparadora</h1>
                    </div>
                </div>
            </div>
            <div class="flex flex-col lg:flex-row justify-center items-center w-full z-20 gap-6 px-12 xl:px-16">
                <div v-for="tratamiento in featuredTratamientos" :key="tratamiento.id"
                    class="video-sample w-full max-w-[320px] sm:max-w-[70%] lg:max-w-[32%] xl:max-w-[33%] ">
                    <nuxt-link :to="formatLink(tratamiento.link)"
                        class="flex items-center bg-nude-8/40 backdrop-blur overflow-hidden rounded-xl min-w-[320px] xl:min-w-[30vw] shadow-lg">
                        <div class="p-0 h-full w-[30%] xl:w-1/3 aspect-square overflow-hidden">
                            
                            <nuxt-img v-if="tratamiento && tratamiento.acf && tratamiento.acf.imagen_cards" class="absolute inset-0 w-full h-full object-cover object-center"
                                :src="tratamiento.acf.imagen_cards.sizes.medium"
                                :srcset="tratamiento.acf.imagen_cards.srcset"
                                :width="tratamiento.acf.imagen_cards.width"
                                :height="tratamiento.acf.imagen_cards.height"
                                :alt="tratamiento.acf.imagen_cards.alt || 'Imagen sin descripción'" />
                            <!-- <video ref="video" :src="tratamiento.acf.video_url" muted loop
                                v-if="tratamiento.acf.video_url" class="absolute inset-0 w-full h-full transition-opacity"
                                :style="{ opacity: videoOpacity }"></video> -->
                        </div>
                        <div class="px-4 w-[70%] xl:w-2/3 flex justify-start items-center h-full">
                            <div>
                                <h2 class="text-lg xl:text-xl font-medium mb-4">{{ tratamiento.acf.titulo }}</h2>
                                <div class="gold text-xs xl:text-clamp-sm !px-4">¡Calcula tu presupuesto!</div>
                            </div>
                        </div>
                        <svg class="size-8 xl:size-12 absolute right-1 bottom-1" width="92" height="92"
                            viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="45.5811" cy="45.6007" rx="32" ry="32.5"
                                transform="rotate(43.416 45.5811 45.6007)" fill="#273E60" />
                            <path
                                d="M32.7615 46.0546L58.4009 45.1466M58.4009 45.1466L48.5948 35.8682M58.4009 45.1466L49.3266 54.7371"
                                stroke="white" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { useAsyncData } from 'nuxt/app'
    import { getTratamiento } from '@/composables/useApi';

    // const video = ref(null);
    // const videoOpacity = ref(0);

    const props = defineProps({
        data: {
            type: Object,
            required: true,
        }
    })

    // Usamos `useFetch` para hacer la solicitud de datos.
    const { data: featuredTratamientos, error } = await useAsyncData('featured-tratamientos', async () => {
        const tratamientos = await getTratamiento({ getAll: true });
        return tratamientos.filter(tratamiento =>
            tratamiento.acf?.destacar_post?.includes('featured')
        );
    });


    // Función para formatear el link
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

    // onMounted(() => {

    //     const videos = document.querySelectorAll('.video-sample')
    
    //     videos.forEach(video => {
    //         const item = video.querySelector('video')
    //         video.addEventListener('mouseenter', () => {
    //             item.style.opacity = 1
    //             item.play()
    //             // console.log('video play');
                
    //         })
    //         video.addEventListener('mouseleave', () => {
    //             item.style.opacity = 0
    //             item.currentTime = 0
    //             item.pause()
    //             // console.log('video pause');
                
    //         })
    //     })
    // })


</script>

<style lang="scss" scoped>
    .gold {
        @apply py-2 px-6 w-fit rounded-full text-white font-normal animate-gradient bg-gold-gradient-text bg-[length:300%_300%] [animation-play-state:paused] hover:[animation-play-state:running];
    }

    .intro {
        @apply h-screen max-h-[68.75rem];

        &__image {
            @apply h-screen inset-0 absolute w-screen flex flex-col justify-evenly items-start gap-8;

            &::after {
                @apply content-[''] absolute inset-0 size-full bg-white/30;
            }
        }
    }

    .girl {
        @apply h-screen w-screen object-cover object-[75%] xl:object-center absolute z-0 left-0;
    }

    .intro__title {
        @apply font-lora font-normal text-clamp-4xl lg:text-[8vw] xl:text-[3vw] text-blue-1 leading-[0.9] mb-8 mt-screen/20 pl-8 lg:pl-16 text-left z-10;

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
