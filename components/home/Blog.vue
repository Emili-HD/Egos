<template>
   <section class="home__blog py-6 px-4" v-if="blog">
      <header class="home__blog--header">
        <h2 class="home__blog--header-title">{{ blog.title.rendered }}</h2>
        <div class="home__blog--header-content" v-html="blog.content.rendered"></div>
      </header>
      <ElementsDivider />
      <div class="post-list grid grid-cols-16 gap-4" v-if="posts" aria-label="Lista de publicaciones">
        <article v-for="post in posts" :key="post.id" class="card rounded-3xl overflow-hidden" :aria-labelledby="'post-title-' + post.id">
          <nuxt-link :to="`blog/${post.slug}`" :aria-label="'Leer más sobre ' + post.title.rendered">
            <NuxtImg sizes="90vw md:50vw xl:330px" loading="lazy" v-if="post.featured_image_src" :src="post.featured_image_src.src" class="card__image aspect-square object-cover h-full"
              :alt="post.featured_image_src.alt" :aria-labelledby="'post-title-' + post.id" />
            <div class="card__content p-4">
              <div class="card__content-wrapper text-left">
                <p class="card__content-cat text-gold-2 font-normal text-clamp-base"><span>Categoría: {{ post.categories_names.join(', ') }}</span></p>
                <h2 :id="'post-title-' + post.id" class="h6 font-canela font-light">{{ post.title.rendered }}</h2>
              </div>
              <svg class="size-16 self-end" width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="45.5811" cy="45.6007" rx="32" ry="32.5" transform="rotate(43.416 45.5811 45.6007)" fill="#273E60"/>
                <path d="M32.7615 46.0546L58.4009 45.1466M58.4009 45.1466L48.5948 35.8682M58.4009 45.1466L49.3266 54.7371" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </nuxt-link>
        </article>
      </div>
      
   </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getSinglePage } from '@/composables/useApi';

// Estados reactivos
const blog = ref(null);
const posts = ref([]);
const postsData = ref({ per_page: 20, page: 1 });

// Métodos
const loadPosts = async () => {
   const response = await getPosts(postsData.value.page, postsData.value.per_page);
   posts.value = response.data.filter(post => post.sticky);
};

const loadInitialData = async (id) => {
   const response = await getSinglePage(id);
   blog.value = response.data;
};

onMounted( async () => {
   await loadInitialData(934);
   await loadPosts();
})
</script>


<style lang="scss" scoped>
.home__blog {
   // background: radial-gradient(circle, rgb(255, 255, 255) 20%, rgb(248, 247, 244) 80%);
   // border-radius: var(--radius-xl);
   // margin: auto;
   // width: calc(100vw - var(--gap) * 2);

   &--header {
      display: grid;
      grid-template-columns: repeat(16, minmax(0, 1fr));
      gap: 1rem;
      // min-height: clamp(300px, 35vh, 400px);
      position: relative;
      text-align: center;
      width: 100%;
      z-index: 1;

      @media (max-width: 767px) {
         gap: 0;
         text-align: left;
      }
      
      &-title {
         grid-column: 3/-3;
         
         @media (max-width: 767px) {
            grid-column: 2/-2;
            font-size: calc(var(--font-size) * 2.5);
         }
      }
      
      &-content {
         grid-column: 4/-4;
         
         @media (max-width: 767px) {
            grid-column: 2/-2;
         }
      }
   }

   .post-list {
      .card {
         aspect-ratio: unset;
         background-color: var(--nude-6);

         a {
            display: flex;

            @media (max-width: 767px) {
               flex-direction: column;
            }
         }

         &:nth-child(2n-1) {
            grid-column: 2/9;

            @media (max-width: 767px) {
               grid-column: 2/-2;
            }
         }

         &:nth-child(2n) {
            grid-column: 9/16;

            @media (max-width: 767px) {
               grid-column: 2/-2;
            }
         }

         &__image {
            aspect-ratio: 1;
            object-fit: cover;
            width: calc(100% / 7 * 3);

            @media (max-width: 767px) {
               width: 100%;
            }
         }

         &__content {
            width: calc(100% / 7 * 4);
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            &-cat {
               color: var(--gold-2);
               font-weight: 400;

               span {
                  font-size: calc(var(--font-size) * 1.3);
               }
            }

            @media (max-width: 767px) {
               width: 100%;
            }
         }
      }
   }
}
</style>
