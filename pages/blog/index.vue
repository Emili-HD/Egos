<template>
    <main class="site-main blog bg-white" role="main" aria-label="Blog principal">
        <section class="blog mb-0" v-if="blogPage" aria-labelledby="page-title">
            <header class="blog__header section__header pt-40 grid grid-cols-16 min-h-[40vh] gap-y-8">
                <h1 class="blog__header-title text-center font-normal mb-0 col-[2/-2] lg:col-[4/-4]">
                    {{ blogPage.title.rendered }}
                </h1>
                <ElementsDivider class="mt-8 !mb-4 col-[2/-2] lg:col-[4/-4]" />
                <div class="blog__header-content text-center col-[2/-2] lg:col-[4/-4]"
                    v-html="blogPage.content.rendered"></div>
                <BlogPostDestacado />
            </header>

            <div class="post-list grid grid-cols-16 gap-4 mt-20 " v-if="posts" aria-label="Lista de publicaciones">
                <article v-for="post in posts" :key="post.id" class="card aspect-none bg-nude-6 rounded-3xl overflow-hidden col-[2/-2]
                sm:[&:nth-child(2n-1)]:col-[2/9] sm:[&:nth-child(2n)]:col-[9/16]
                lg:[&:nth-child(2n-1)]:col-[2/9] lg:[&:nth-child(2n)]:col-[9/16]"
                    :aria-labelledby="'post-title-' + post.id">
                    <nuxt-link class="flex flex-col xl:flex-row h-full" :to="'/blog/' + post.slug + '/'"
                        :aria-label="'Leer más sobre ' + post.title.rendered">
                        <!-- <UiImage :data="post" class="card__image !aspect-square" loading="lazy" /> -->
                        <img class="card__image aspect-square w-full xl:w-[45%] min-w-[22rem] object-cover object-center rounded-2xl overflow-hidden"
                            loading="lazy" v-if="post.featured_image_data" :src="post.featured_image_data.url"
                            :srcset="post.featured_image_data.srcset" :alt="post.featured_image_data.alt"
                            :aria-labelledby="'post-title-' + post.id" />
                        <div class="card__content p-4 flex flex-col w-full">
                            <div
                                class="card__content-wrapper text-left [&_h2,&_h3]:text-clamp-xl [&_h2,&_h3]:font-light">
                                <p class="card__content-cat text-gold-3 font-normal text-clamp-base w-full">
                                    <span>Categoría: {{ post.categories_names.join(', ') }}</span>
                                    <br />
                                    <time :datetime="post.date_gmt">
                                        {{ formatDate(post.date_gmt) }}
                                    </time>
                                </p>
                                <h2 :id="'post-title-' + post.id" class="h6">
                                    {{ post.title.rendered }}
                                </h2>
                            </div>
                            <svg class="size-16 self-end" width="92" height="92" viewBox="0 0 92 92" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="45.5811" cy="45.6007" rx="32" ry="32.5"
                                    transform="rotate(43.416 45.5811 45.6007)" fill="#273E60" />
                                <path
                                    d="M32.7615 46.0546L58.4009 45.1466M58.4009 45.1466L48.5948 35.8682M58.4009 45.1466L49.3266 54.7371"
                                    stroke="white" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </div>
                    </nuxt-link>
                </article>
                <div v-if="showLoadingIndicator"
                    class="loading-indicator col-[1/-1] text-center text-clamp-xl font-normal p-12">
                    Cargando más posts...
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
    import { useAsyncData } from 'nuxt/app';
    import { getPosts, getPage } from '@/composables/useApi';
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import ScrollTrigger from 'gsap/ScrollTrigger';

    const postsPerPage = 100;
    const { $gsap: gsap } = useNuxtApp();
    const showLoadingIndicator = ref(true);
    const page = ref(1);

    // Carga inicial de posts con try/catch
    let posts, refreshPosts;
    try {
        const { data: postsData, refresh } = await useAsyncData('posts', () => getPosts({ page: page.value, perPage: postsPerPage }), { initialCache: true });
        posts = postsData;
        refreshPosts = refresh;
    } catch (error) {
        console.error('Error fetching posts:', error);
        postsError.value = error; // Guardar el error en una variable reactiva
    }

    // Carga de información de la página del blog con try/catch
    let blogPage;
    try {
        const { data: blogPageData } = await useAsyncData('blogPage', () => getPage(934), { initialCache: true });
        blogPage = blogPageData;
    } catch (error) {
        console.error('Error fetching blog page:', error);
        blogPageError.value = error; // Guardar el error en una variable reactiva
    }

    // Carga más posts
    const loadMorePosts = async () => {
        page.value++;
        await refreshPosts();
    };

    const formatDate = (date) => {
        const newDate = new Date(date)
        const day = newDate.getDate().toString().padStart(2, '0')
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0') // Meses comienzan en 0
        const year = newDate.getFullYear()
        return `${day}/${month}/${year}`
    }

    // Mounted lifecycle
    onMounted(() => {
        if (import.meta.client) {
            gsap.registerPlugin(ScrollTrigger);

            ScrollTrigger.create({
                trigger: '.loading-indicator',
                start: 'bottom bottom',
                onEnter: () => {
                    if (page.value < paginationData.value.totalPages) {
                        loadMorePosts();
                    }
                }
            });
        }
    });

    const { generateYoastHead } = useYoastHead(blogPage);
    const yoastHead = generateYoastHead();

    useHead({
        ...yoastHead,
    });
</script>

<style scoped>
    /* // empty style */
</style>
