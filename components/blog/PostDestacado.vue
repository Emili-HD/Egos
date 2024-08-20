<template>
    <div class="destacado">
        <div v-if="pending" class="loading">Loading...</div>
        <div v-else-if="error" class="error">Error loading posts</div>
        <div class="post-list w-full mt-0 flex" v-else>
            <article v-for="post in highlightedPostsData" :key="post.id" class="card">
                <nuxt-link class="post-link" :to="'/blog/' + post.slug + '/'">
                    <UiImage :data="post" class="card__image" loading="eager" />
                    <div class="card__content">
                        <div class="card__content-wrapper text-left [&_h2,&_h3]:text-clamp-xl [&_h2,&_h3]:font-light">
                            <p class="card__content-cat">
                                <span>Categoría: {{ post.categories_names.join(', ') }}</span>
                                <br />
                                <time :datetime="post.date_gmt">
                                    {{ formatDate(post.date_gmt) }}
                                </time>
                            </p>
                            <h2 class="h6">{{ post.title.rendered }}</h2>
                        </div>
                        <svg class="size-20 self-end max-h-20" width="92" height="92" viewBox="0 0 92 92" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="45.5811" cy="45.6007" rx="32" ry="32.5"
                                transform="rotate(43.416 45.5811 45.6007)" fill="#C0B5A3" />
                            <path
                                d="M32.7614 46.0546L58.4008 45.1466M58.4008 45.1466L48.5947 35.8682M58.4008 45.1466L49.3264 54.7371"
                                stroke="#1C2C44" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                    </div>
                </nuxt-link>
            </article>
        </div>
    </div>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app';
import { getPosts } from '@/composables/useApi';
import { ref } from 'vue';

// Define los parámetros de la petición
const postsParams = { per_page: 100, page: 1 };

// Uso de useAsyncData para cargar y procesar los posts destacados
const { data: highlightedPostsData, error, pending } = await useAsyncData('highlightedPosts', async () => {
    const response = await getPosts(postsParams);
    const highlightedPosts = response.filter(
        post => post.acf && post.acf.destacar_post && post.acf.destacar_post.includes('Destacado')
    ).sort((a, b) => new Date(b.date) - new Date(a.date));
    // Solo toma el post destacado más reciente
    console.log('Highlighted Posts:', highlightedPosts); // Agregar log
    return highlightedPosts.slice(0, 1);
});

// Función auxiliar para formatear fechas
const formatDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
};
</script>



<style lang="scss" scoped>
.destacado {
    @apply rounded-3xl m-auto w-full p-0 col-[2/-2] flex max-w-full min-h-[40vh];

    .card {
        @apply bg-blue-1 aspect-auto w-full rounded-3xl overflow-hidden;

        &__content {
            @apply p-8 text-nude-8 items-start flex flex-col lg:flex-row;

            &-cat {
                @apply text-gold-2 font-normal text-clamp-base w-full;
            }
        }
    }

    .post-link {
        @apply text-blue-1 h-full p-0 flex flex-col lg:flex-row;
    }
}
</style>
