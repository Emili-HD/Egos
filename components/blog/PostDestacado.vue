<template>
  <div class="destacado rounded-3xl m-auto w-full p-0 col-[2/-2] flex max-w-full min-h-[40vh]">
    <div class="post-list w-full mt-0 flex" v-if="posts">
      <article v-for="post in posts" :key="post.id" class="card bg-blue-1 aspect-auto w-full">
        <nuxt-link class="text-blue-1 font-canela h-full p-0 flex flex-col lg:flex-row" :to="'/blog/' + post.slug">
          <NuxtImg
            loading="lazy"
            v-if="post.featured_image_src"
            :src="post.featured_image_src.src"
            class="card__image  w-full bg-nude-7 rounded-2xl [.blog_&]:!aspect-[3/2] flex flex-col lg:flex-row p-0 h-full relative"
            :alt="post.featured_image_src.alt"
          />
          <div class="card__content p-8 text-nude-8 items-start flex flex-col lg:flex-row">
            <div class="card__content-wrapper text-left">
              <p class="card__content-cat">
                <span>Categoría: {{ post.categories_names.join(', ') }}</span>
                <br />
                <time :datetime="post.date_gmt">
                  {{ formatDate(post.date_gmt) }}
                </time>
              </p>
              <h2 class="h6">{{ post.title.rendered }}</h2>
              <p class="text-nude-8" v-html="post.excerpt.rendered"></p>
            </div>
            <svg
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
                fill="#C0B5A3"
              />
              <path
                d="M32.7614 46.0546L58.4008 45.1466M58.4008 45.1466L48.5947 35.8682M58.4008 45.1466L49.3264 54.7371"
                stroke="#1C2C44"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </nuxt-link>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPosts } from '@/composables/useApi'

// Estados reactivos
const posts = ref([])
const postsData = ref({ per_page: 100, page: 1 })

// Métodos
const getHighlightedPosts = async () => {
  try {
    const response = await getPosts(
      postsData.value.page,
      postsData.value.per_page,
    )
    // Filtra los posts para encontrar aquellos con acf.destacar_post igual a ["Destacado"]
    const highlightedPosts = response.data.filter(
      (post) =>
        post.acf &&
        post.acf.destacar_post &&
        post.acf.destacar_post.includes('Destacado'),
    )
    // Ordena los posts destacados por fecha, de más nuevo a más antiguo
    highlightedPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
    // Solo toma el post destacado más reciente
    posts.value = highlightedPosts.slice(0, 1)
  } catch (error) {
    console.error(error)
  }
}

const formatDate = (date) => {
  const newDate = new Date(date)
  const day = newDate.getDate().toString().padStart(2, '0')
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0') // Meses comienzan en 0
  const year = newDate.getFullYear()
  return `${day}/${month}/${year}`
}

await getHighlightedPosts()
</script>

<style lang="scss" scoped>
// empty style
</style>
