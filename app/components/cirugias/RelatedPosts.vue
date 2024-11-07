<template>
    <div v-if="postsError">Error al cargar los posts.</div>
    <section v-else id="posts" class="related__posts pt-6 px-8 xl:px-[calc(100%/16)] mb-0" data-anchor="posts">
        <h2 class="text-center">{{ treatmentsData.titulo_posts_relacionados }}</h2>
        <div class="post-list flex justify-center items-start gap-2 pb-0 lg:pb-8 h-1/2 w-full overflow-hidden"
            aria-label="Lista de publicaciones" v-if="posts">
                <Swiper 
                    :slidesPerView="1"
                    :spaceBetween="30"
                    :navigation="true"
                    :modules="[SwiperNavigation]"
                    class="postsSlide w-full"
                    :breakpoints="{
                        '768': {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        '1024': {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                        '1440': {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }"
                >
                    <SwiperSlide v-for="post in posts" :key="post.id" 
                        class="card rounded-xl overflow-hidden flex flex-shrink-0 justify-center items-start h-full"
                        :aria-labelledby="'post-title-' + post.id">
                        <nuxt-link v-if="post.title && post.title.rendered" :to="`/blog/${post.slug}`" :aria-label="post.title ? 'Leer más sobre ' + post.title.rendered : 'Leer más'
                            " class="post-link size-full">
                            <UiImage loading="lazy" :data="post" class="rounded-2xl size-full aspect-square object-cover" />
                            <h2 class="bg-white rounded-2xl p-4 mt-4 text-2xl text-pretty" v-if="post.title && post.title.rendered" :id="'post-title-' + post.id">
                                {{ post.title.rendered }}
                            </h2>
                        </nuxt-link>
                    </SwiperSlide>
                </Swiper>
        </div>
    </section>
</template>

<script setup>
import { getPosts } from '@/composables/useApi'

// Props
const props = defineProps({
    treatmentsData: {
        type: Object,
        required: true,
    },
    categoryId: {
        type: Number,
    },
})

// Computed para obtener la categoría de los posts relacionados
const relatedCategoryId = computed(() => props.treatmentsData.posts_relacionados)
// console.log('categoryId:', relatedCategoryId.value)

// useAsyncData para cargar los posts
const { data: posts, error: postsError } = await useAsyncData(
    `unique-key-${relatedCategoryId.value}`, // Identificador único basado en la categoría
    () => getPosts({ categoryId: relatedCategoryId.value }) // Pasar un objeto con el parámetro categoryId
);

</script>

<style scoped>
    .post-link:hover {
        h2 {
            @apply bg-blue-3 text-white transition-colors;
        }
    }
</style>
