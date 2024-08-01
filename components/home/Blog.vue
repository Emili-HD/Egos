<template>
  <section class="home__blog py-6 px-4" v-if="blogData">
    <header class="home__blog--header">
      <h2 class="home__blog--header-title">{{ blogData.title.rendered }}</h2>
      <div
        class="home__blog--header-content"
        v-html="blogData.content.rendered"
      ></div>
    </header>
    <ElementsDivider />
    <div
      class="post-list grid grid-cols-16 gap-4"
      v-if="postsData"
      aria-label="Lista de publicaciones"
    >
      <article
        v-for="post in stickyPosts"
        :key="post.id"
        class="card rounded-3xl overflow-hidden col-[2/-2]
               lg:[&:nth-child(2n-1)]:col-[2/9] lg:[&:nth-child(2n)]:col-[9/16] bg-nude-8"
        :aria-labelledby="'post-title-' + post.id"
      >
        <nuxt-link
          :to="`blog/${post.slug}/`"
          :aria-label="'Leer más sobre ' + post.title.rendered"
        >
          <img
            loading="lazy"
            v-if="post.featured_image_data"
            :src="post.featured_image_data.url"
            :srcset="post.featured_image_data.srcset"
            class="card__image aspect-square object-cover h-full rounded-2xl overflow-hidden"
            :alt="post.featured_image_data.alt"
            :aria-labelledby="'post-title-' + post.id"
          />
          <div class="card__content p-4">
            <div class="card__content-wrapper text-left [&_h2,&_h3]:text-clamp-xl [&_h2,&_h3]:font-light">
              <p
                class="card__content-cat text-gold-2 font-normal text-clamp-base w-full"
              >
                <span>Categoría: {{ post.categories_names.join(', ') }}</span>
              </p>
              <h2
                :id="'post-title-' + post.id"
                class="h6 font-light"
              >
                {{ post.title.rendered }}
              </h2>
            </div>
            <svg
              class="size-16 self-end"
              width="92"
              height="92"
              viewBox="0 0 92 92"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="45.5811"
                cy="45.6007"
                rx="32"
                ry="32.5"
                transform="rotate(43.416 45.5811 45.6007)"
                fill="#273E60"
              />
              <path
                d="M32.7615 46.0546L58.4009 45.1466M58.4009 45.1466L48.5948 35.8682M58.4009 45.1466L49.3266 54.7371"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </nuxt-link>
      </article>
    </div>
  </section>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app';
import { getPage, getPosts } from '@/composables/useApi';

// Definir IDs y parámetros como constantes o reactivos según sea necesario
const blogId = 934;
const postsParams = { per_page: 100, page: 1 };

// Uso de useAsyncData para cargar la información de la página del blog
const { data: blogData, error: blogError } = await useAsyncData(() => getPage(blogId));

// Uso de useAsyncData para cargar los posts, aplicando un filtro a los resultados
const { data: postsData, error: postsError } = await useAsyncData('blog-posts', () => getPosts(postsParams));
// console.log(postsData.value); // Verificar la estructura y contenido de los datos originales

// Filtrar posts "sticky" usando una propiedad computada
import { computed } from 'vue';
const stickyPosts = computed(() => postsData.value ? postsData.value.filter((post) => post.sticky) : []);
</script>


<style lang="scss" scoped>
.home__blog {
  &--header {
    @apply grid grid-cols-16 gap-4 relative text-center w-full z-[1];

    @media (max-width: 767px) {
      @apply gap-0 text-left;
    }

    &-title {
      @apply col-[3/-3];

      @media (max-width: 767px) {
        @apply col-[2/-2];
      }
    }

    &-content {
      @apply col-[4/-4];

      @media (max-width: 767px) {
        @apply col-[2/-2];
      }
    }
  }

  .post-list {
    .card {
      @apply aspect-[unset] bg-nude-7 shadow-md;

      a {
        @apply flex;

        @media (max-width: 767px) {
          @apply flex-col;
        }
      }

      &:nth-child(2n-1) {
        @apply col-[2/9];

        @media (max-width: 767px) {
          @apply col-[2/-2];
        }
      }

      &:nth-child(2n) {
        @apply col-[9/16];

        @media (max-width: 767px) {
          @apply col-[2/-2];
        }
      }

      &__image {
        @apply aspect-square object-cover w-[calc(100%/7*3)];

        @media (max-width: 767px) {
          @apply w-full;
        }
      }

      &__content {
        @apply w-[calc(100%/7*4)] flex flex-col justify-between;

        &-cat {
          @apply font-normal text-gold-3;
        }

        @media (max-width: 767px) {
          @apply w-full;
        }
      }
    }
  }
}
</style>
