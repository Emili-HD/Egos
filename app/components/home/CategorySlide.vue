<template>
    <div class="card" :class="props.classes" v-if="category">
        <nuxt-link :to="processedLink" class="card__link" aria-label="Ver detalles de cirugía">
            <div v-if="category.acf && category.acf.badge">
                <p class="card__link-badge">{{ category.acf.badge }}</p>
            </div>
            <picture class="card__picture"
                v-if="category.acf && category.acf.imagen_cards && category.acf.imagen_cards.url">
                <img loading="lazy" class="card__picture-img absolute inset-0 w-full h-full object-cover object-center"
                    :src="category.acf.imagen_cards.sizes.medium_large" :alt="category.acf.imagen_cards.alt"
                    :width="category.acf.imagen_cards.width" :height="category.acf.imagen_cards.height" />
                <video ref="video" :src="category.acf.video_url" autoplay muted playsinline loop v-if="category.acf.video_url"
                    class="absolute inset-0 w-full h-full transition-opacity"
                    :style="{ opacity: videoOpacity }"></video>

                <div v-if="category.acf.oferta_desde" class="price__wrapper">
                    <span>desde </span>
                    <div class="desde [&>span]:line-through [&>span]:text-red-600 [&>span]:opacity-50"
                        v-if="category.acf && category.acf.precio_desde" v-html="category.acf.precio_desde"></div>
                    <div class="desde" v-if="category.acf.rebaja" v-html="category.acf.rebaja"></div>
                    <ElementsCountDown :data="category.acf" />
                </div>
                <p class="desde" v-else-if="category.acf && category.acf.precio_desde"
                    v-html="category.acf.precio_desde"></p>
            </picture>
            <div class="category__title">
                <h3 class="h5">{{ category.title.rendered }}</h3>
                <div v-html="category.excerpt.rendered"
                    class="[&>p]:text-clamp-sm [&>p]:mb-0 [&>p]:text-center [&>p]:text-pretty"></div>
            </div>
        </nuxt-link>
        <UiButton v-if="category.acf && category.acf.anchor"
            class="button blue text-xs text-balance w-full font-semibold py-2 px-6" :to="processedLink">Saber más sobre
            {{ category.acf.anchor }}</UiButton>
        <UiButton v-else class="button blue" :to="processedLink">Saber más</UiButton>
    </div>
    <div v-else>
        <p>Cargando categoría...</p>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useAsyncData } from 'nuxt/app';
    import { getTratamiento } from '@/composables/useApi';



    // Definir props
    const props = defineProps({
        categoryId: {
            type: Number,
            required: true
        },
        classes: {
            type: String,
        }
    });

    // Propiedad computada
    const processedLink = computed(() => {
        if (category.value && category.value.link) {
            const url = new URL(category.value.link);
            return url.pathname;
        }
        return '';
    });

    const { data: category, error } = await useAsyncData(`tratamiento-${props.categoryId}`, () => getTratamiento({ id: props.categoryId }));

    const video = ref(null);
    const videoOpacity = ref(1)

    onMounted(() => {

        const videos = document.querySelectorAll('.card__picture')

        videos.forEach(video => {
            const item = video.querySelector('video')
            // Verificamos si 'item' existe antes de agregar los eventos
            if (item) {
                item.play()
                window.addEventListener('load', () => {
                    item.style.opacity = 1
                })
                // document.addEventListener('mouseleave', () => {
                //     item.style.opacity = 0
                //     item.currentTime = 0
                //     item.pause()
                // })
            }
        })
    })
</script>

<style lang="scss" scoped>
    .card {
        @apply pb-4 rounded-xl min-h-full flex flex-col justify-between items-center;

        &__link {
            @apply w-full h-full block;

            &-badge {
                @apply absolute top-2 left-2 bg-blue-6 text-white px-4 pt-2 pb-1 rounded-2xl z-10;
            }
        }

        &__picture {
            @apply aspect-square xl:max-h-vh/70 bg-nude-8 block min-h-full rounded-2xl overflow-hidden mb-4;

            &-img {
                @apply size-full object-cover object-center;
            }
        }

        .category {
            &__title {
                @apply flex flex-col justify-end items-center gap-4 p-4 relative w-full m-auto;


                h3 {
                    @apply text-center text-clamp-lg lg:text-clamp-base text-pretty font-semibold mb-0;
                }

            }
        }

        .desde {
            @apply text-gold-3 text-clamp-base drop-shadow lowercase font-normal mb-0 mx-auto px-6 bg-nude-8 absolute z-10 bottom-2 w-fit left-0 right-0 text-center rounded-full;
        }

        .price__wrapper {
            @apply flex items-center gap-2;

            .desde {
                @apply inline;
            }
        }

        .button {
            @apply w-fit py-2 px-6 bg-blue-1 text-nude-8 text-center uppercase rounded-xl hover:bg-blue-6 transition-colors;
        }
    }
</style>
