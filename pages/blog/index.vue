<template>
  <main class="site-main blog" role="main" aria-label="Blog principal">

    <section class="blog mb-0" v-if="pages" aria-labelledby="page-title">
      <header class="blog__header section__header pt-40">
        <h1 class="blog__header-title">{{ pages.title.rendered }}</h1>
        <div class="blog__header-content" v-html="pages.content.rendered"></div>
        <BlogPostDestacado />
      </header>
      <ElementsDivider />

      <div class="post-list pb-xs-12" v-if="posts" aria-label="Lista de publicaciones">
        <article v-for="post in posts" :key="post.id" class="card" :aria-labelledby="'post-title-' + post.id">
          <nuxt-link :to="'/blog/' + post.slug"
            :aria-label="'Leer más sobre ' + post.title.rendered">
            <NuxtImg loading="lazy" v-if="post.featured_image_src" :src="post.featured_image_src.src" class="card__image"
              :alt="post.featured_image_src.alt" :aria-labelledby="'post-title-' + post.id" />
            <div class="card__content p-4">
              <div class="card__content-wrapper">
                <p class="card__content-cat"><span>Categoría: {{ post.categories_names.join(', ') }}</span><br><time :datetime="post.date_gmt">{{ formatDate(post.date_gmt) }}</time></p>
                <h2 :id="'post-title-' + post.id" class="h6">{{ post.title.rendered }}</h2>
              </div>
              <svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="45.5811" cy="45.6007" rx="32" ry="32.5" transform="rotate(43.416 45.5811 45.6007)" fill="#273E60"/>
                <path d="M32.7615 46.0546L58.4009 45.1466M58.4009 45.1466L48.5948 35.8682M58.4009 45.1466L49.3266 54.7371" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </nuxt-link>
        </article>
        <div ref="loadingRef" class="loading-indicator" v-if="showLoadingIndicator">Cargando más posts...</div>
      </div>
      
    </section>
  </main>
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { getPosts, getSinglePage } from '@/composables/useApi'
import ScrollTrigger from 'gsap/ScrollTrigger';

const { $gsap: gsap } = useNuxtApp();

// Reactive state
const posts = ref([]);
const loadingRef = ref(null);
const showLoadingIndicator = ref(true);
const postsData = ref({
  per_page: 12,
  page: 1,
});
const paginationData = ref({
  prevPage: '',
  nextPage: '',
  totalPages: '',
  from: '',
  to: '',
  total: '',
});
const pages = ref(null);


// Methods
const loadPosts = async () => {
  try {
    const response = await getPosts(postsData.value.page, postsData.value.per_page);
    posts.value = [...posts.value, ...response.data]; // Concatena nuevos posts
    configPagination(response.headers);
    // await loadMorePosts()
    // console.log("Posts after update", posts.value.length);
  } catch (error) {
    console.error(error);
  }
};

const loadMorePosts = async () => {
  await nextTick();
  
  if (loadingRef.value) {
    ScrollTrigger.update();

    gsap.to(loadingRef.value, {
      scrollTrigger: {
        trigger: loadingRef.value,
        start: "top bottom-=100",
        onEnter: () => {
          if (postsData.value.page < paginationData.value.totalPages) {
            postsData.value.page++;
            loadPosts();
          }
        },
        // onEnterBack: opcional
      },
    });
  } else {
    console.log("loadingRef.value es null");
  }
}

const configPagination = (headers) => {
  paginationData.value.total = +headers['x-wp-total'];
  paginationData.value.totalPages = +headers['x-wp-totalpages'];
  paginationData.value.from = paginationData.value.total ? (postsData.value.page - 1) * postsData.value.per_page + 1 : ' ';
  paginationData.value.to = postsData.value.page * postsData.value.per_page > paginationData.value.total ? paginationData.value.total : postsData.value.page * postsData.value.per_page;
  paginationData.value.prevPage = postsData.value.page > 1 ? postsData.value.page : '';
  paginationData.value.nextPage = postsData.value.page < paginationData.value.totalPages ? postsData.value.page + 1 : '';

  // Actualizar la visibilidad del indicador de carga
  showLoadingIndicator.value = postsData.value.page < paginationData.value.totalPages;
};

const formatDate = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate().toString().padStart(2, '0');
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0'); // Meses comienzan en 0
  const year = newDate.getFullYear();
  return `${day}/${month}/${year}`;
};

// Created lifecycle
const loadComponentData = async () => {
  try {
    const pageResponse = await getSinglePage(934);
    pages.value = pageResponse.data;
    await getPosts();
  } catch (error) {
    console.error(error);
  }
};

// Datos YOAST SEO
useHead(() => {
  if (!pages.value || !pages.value.yoast_head_json) {
    return {
      title: 'Cargando...', // Título temporal mientras se cargan los datos
    };
  }

  const yoast = pages.value.yoast_head_json;

  // Preparar las meta tags basándose en los datos de yoast_head_json
  const metaTags = [
    { name: 'description', content: yoast.og_description || 'Egos | Clínica de cirugía y medicina estética' },
    { property: 'og:title', content: yoast.og_title },
    { property: 'og:description', content: yoast.og_description },
    { property: 'og:url', content: yoast.og_url },
    { property: 'og:type', content: yoast.og_type },
    // Añadir más tags según sean necesarios
  ];

  // Añadir las imágenes de Open Graph si están disponibles
  if (yoast.og_image && yoast.og_image.length > 0) {
    yoast.og_image.forEach((image) => {
      metaTags.push({ property: 'og:image', content: image.url });
      // Agregar también las dimensiones si se desea
      metaTags.push({ property: 'og:image:width', content: image.width.toString() });
      metaTags.push({ property: 'og:image:height', content: image.height.toString() });
    });
  }

  // Añadir la meta tag de robots si está disponible
  if (yoast.robots) {
    const robotsContent = `${yoast.robots.index}, ${yoast.robots.follow}`;
    metaTags.push({ name: 'robots', content: robotsContent });
  }

  return {
    title: yoast.title,
    meta: metaTags,
  };
});

await loadPosts()
await loadComponentData();

// Mounted lifecycle
onMounted(async () => {
  await nextTick();
  await loadMorePosts()
});

</script>


<style lang="scss" scoped>
.card {
  &__image {
    background-color: var(--nude-7);
    border-radius: var(--radius-s);
    overflow: hidden;
    width: 100%;
    aspect-ratio: 3/2;
    object-fit: cover;
  }
}
</style>
