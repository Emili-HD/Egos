<template>
   <div class="destacado">
      <div class="post-list" v-if="posts">
      
            <article v-for="post in posts" :key="post.id" class="card">
               <nuxt-link :to="'/blog/' + post.slug">
                  <NuxtImg loading="lazy" v-if="post.featured_image_src" :src="post.featured_image_src.src" class="card__image" :alt="post.featured_image_src.alt" />
                  <div class="card__content p-1 p-xs-4">
                     <div class="card__content-wrapper">
                        <p class="card__content-cat"><span>Categoría: {{ post.categories_names.join(', ') }}</span><br><time :datetime="post.date_gmt">{{ formatDate(post.date_gmt) }}</time></p>
                        <h2 class="h6">{{ post.title.rendered }}</h2>
                        <p v-html="post.excerpt.rendered"></p>
                     </div>
                     <svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="45.5811" cy="45.6007" rx="32" ry="32.5" transform="rotate(43.416 45.5811 45.6007)" fill="#C0B5A3"/>
                        <path d="M32.7614 46.0546L58.4008 45.1466M58.4008 45.1466L48.5947 35.8682M58.4008 45.1466L49.3264 54.7371" stroke="#1C2C44" stroke-width="1.5" stroke-linecap="round"/>
                     </svg>
                  </div>
               </nuxt-link>
            </article>

        </div>
   </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPosts } from '@/composables/useApi'

// Estados reactivos
const posts = ref([]);
const postsData = ref({ per_page: 100, page: 1 });

// Métodos
const getHighlightedPosts = async () => {
  try {
    const response = await getPosts(postsData.value.page, postsData.value.per_page);
    // Filtra los posts para encontrar aquellos con acf.destacar_post igual a ["Destacado"]
    const highlightedPosts = response.data.filter(post => 
      post.acf && post.acf.destacar_post && post.acf.destacar_post.includes("Destacado")
    );
    // Ordena los posts destacados por fecha, de más nuevo a más antiguo
    highlightedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    // Solo toma el post destacado más reciente
    posts.value = highlightedPosts.slice(0, 1);
  } catch (error) {
    console.error(error);
  }
};


const formatDate = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate().toString().padStart(2, '0');
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0'); // Meses comienzan en 0
  const year = newDate.getFullYear();
  return `${day}/${month}/${year}`;
};

await getHighlightedPosts();
</script>


<style lang="scss" scoped>
.destacado {
   background: radial-gradient(circle, rgb(255, 255, 255) 20%, rgb(248, 247, 244) 80%);
   border-radius: var(--radius-xl);
   margin: auto;
   width: calc(100vw - var(--gap) * 2);
   padding: 0;

   &__header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      gap: 1rem;
      min-height: clamp(300px, 35vh, 400px);
      position: relative;
      text-align: center;
      width: 100%;
      z-index: 1;
   }
}
.card {
   & > a {
      color: var(--blue-1);
      display: block;
      font-family: var(--font-family-headings);
      height: 100%;
      padding: calc(var(--spacing) / 2);
   }

   &__image {
      aspect-ratio: 1;
      background-color: var(--nude-7);
      border-radius: var(--radius-s);
      inset: 0;
      object-fit: cover;
      overflow: hidden;
      position: absolute;
      width: 100%;
   }
}
</style>
