<template>
    <main class="site-main" v-if="post">
        <article :class="{ 'fullwidth': post.acf.quiz && post.acf.quiz.posicion === 'top' }">
            <div class="post__header before-gradient mb-12 bg-cover bg-center bg-no-repeat h-[70vh] flex flex-col justify-end items-center overflow-hidden"
                v-if="post.acf && !post.acf.quiz || post.acf.quiz.posicion === 'bottom'">
                <img class="absolute object-cover object-center inset-0 z-0 min-h-full" loading="lazy"
                    v-if="post.featured_image_data" :src="post.featured_image_data.url"
                    :srcset="post.featured_image_data.srcset" :alt="post.featured_image_data.alt"
                    :aria-labelledby="'post-title-' + post.id" />
                <h1 v-if="isCritical"
                    class="font-lora text-nude-8 font-semibold text-center max-lg:text-clamp-4xl w-full xl:max-w-[60vw] z-10">{{
                        post.title.rendered }}</h1>

            </div>

            <!-- CABECERA MODIFICADA PARA FORM QUIZ -->
            <div class="post__header before-gradient bg-cover bg-center bg-no-repeat h-[70vh] xl:h-[50vh] flex flex-col justify-center items-center overflow-hidden p-8"
                v-if="post.acf && post.acf.quiz && post.acf.quiz.posicion === 'top'">
                <img class="absolute object-cover object-center inset-0 z-0 min-h-full" loading="lazy"
                    v-if="post.featured_image_data" :src="post.featured_image_data.url"
                    :srcset="post.featured_image_data.srcset" :alt="post.featured_image_data.alt"
                    :aria-labelledby="'post-title-' + post.id" />
                <h1 v-if="isCritical"
                    class="font-lora text-nude-8 font-semibold text-center max-lg:text-clamp-4xl w-full xl:max-w-[60vw] z-10 mt-20">
                    {{
                        post.title.rendered }}</h1>

            </div>

            <!-- FORM QUIZ SÓLO SI ESTÁ PRESENTE -->
            <aside class="bg-blue-1 p-6 w-full lg:w-[70vw] xl:w-[45vw] m-auto mb-20 lg:-mt-36 lg:rounded-3xl z-20"
                v-if="post.acf && post.acf.quiz && post.acf.quiz.posicion === 'top'">
                <div id="calculadora" class="lg:px-12 lg:pb-12">
                    <FormsQuiz v-if="post && post.acf" :identificador="'topPage'"
                        :portalId="String(post.acf.quiz.portalid)" :formId="post.acf.quiz.formid"
                        :titulo="post.acf.quiz.titulo_form" />
                </div>
            </aside>

            <div class="breadcrumbs flex gap-4 px-4 divide-x divide-blue-1/50 font-[nunito,_serif]">
                <NuxtLink class="pl-4 mb-0 leading-3 font-normal" to="/">Inicio</NuxtLink>
                <NuxtLink class="pl-4 mb-0 leading-3 font-normal" to="/blog/">Blog</NuxtLink>
                <div class="pl-4 mb-0 leading-3 italic">{{ post.title.rendered }}</div>
            </div>
            <section class="post__content px-2 pb-10 gap-1 xl:gap-4 grid grid-cols-[repeat(16,_minmax(0,_1fr))]">
                <aside class="nav-content p-6 col-[1/-1] xl:col-span-3 self-start rounded-3xl">
                    <h4 class="font-[lora_sans-serif] nav-content-title h6 bg-nude-4 p-4">Tabla de contenidos</h4>
                    <ul class="pl-6 list-decimal">
                        <li class="py-2 cursor-pointer border-b border-x-0 border-t-0 border-solid border-b-blue-1/25"
                            v-for="(content, index) in post.acf.areas_de_contenido"
                            @click.passive="lenis.scrollTo(`#area-${index}`, { offset: -100 })"><span>{{
                                content.titulo_area }}</span>
                        </li>
                        <li class="py-2 cursor-pointer border-b border-x-0 border-t-0 border-solid border-b-blue-1/25"
                            v-if="post.acf.post_description.titulo_recomendaciones"
                            @click.passive="lenis.scrollTo('#recomendaciones', { offset: -100 })"><span
                                v-html="post.acf.post_description.titulo_recomendaciones"></span></li>
                        <li class="py-2 cursor-pointer border-b border-x-0 border-t-0 border-solid border-b-blue-1/25"
                            v-if="post.acf.post_faqs.titulo_faqs"
                            @click.passive="lenis.scrollTo('#faqs', { offset: -100 })"><span
                                v-html="post.acf.post_faqs.titulo_faqs"></span></li>
                    </ul>
                </aside>

                <div class="post__content-areas p-0 xl:py-6 xl:px-10 col-[2/-2] xl:col-[4/13]">
                    <div v-if="post.content.rendered" class="[&_h2]:font-lora [&_p]:font-nunito post__content-text pb-4" v-html="post.content.rendered">
                    </div>
                    <div class="post__content-text pb-4" v-for="(content, index) in post.acf.areas_de_contenido"
                        :id="`area-${index}`">
                        <h2 class="area-title font-lora">{{ content.titulo_area }}</h2>
                        <div class="[&_p]:font-nunito" v-html="content.contenido_area"></div>
                        <div class="post__content-image" v-if="content.imagen_area.url">
                            <img loading="lazy" :src="content.imagen_area.url" :srcset="content.imagen_area.srcset"
                                :width="content.imagen_area.width" :height="content.imagen_area.height"
                                :alt="content.imagen_area.alt" />
                        </div>
                    </div>

                    <div id="recomendaciones" v-if="post.acf.post_description.titulo_recomendaciones"
                        class="post__content-text recomendaciones pb-6">
                        <div class="heading accordion__heading">
                            <h2 class="accordion__heading-title area-title [&>span]:block [&>span]:text-clamp-xl [&>span]:mb-0"
                                v-html="post.acf.post_description.titulo_recomendaciones"></h2>
                            <div class="accordion__description pb-2"
                                v-html="post.acf.post_description.descripcion_recomendaciones">
                            </div>
                        </div>
                        <div class="list accordion__list">
                            <div class="accordion__list--item flex flex-col flex-wrap justify-between py-5 cursor-pointer separador-lista"
                                v-for="item in post.acf.post_description.secciones_del_post" :key="item.post_subtitle">
                                <div class="accordion__list--item-title flex flex-row justify-between items-center [&>*]:font-normal [&>*]:m-0">
                                    <div class="max-w-[85%] [&>.h4]:text-clamp-base [&>.h4]:mb-0 text-clamp-base mb-0 !font-light"
                                        v-html="item.post_subtitle"></div>
                                    <svg class="size-6 stroke-blue-1 stroke-1" viewbox="0 0 24 24">
                                        <path class="iconV" d="M 12,0 V 24" />
                                        <path class="iconH" d="M 0,12 H 24" />
                                    </svg>
                                </div>
                                <div class="accordion__list--item-descripcion self-end h-0 w-full xl:w-[60%] opacity-0 relative"
                                    v-html="item.post_description"></div>
                            </div>
                        </div>
                    </div>

                    <div v-if="post.acf.post_faqs && post.acf.post_faqs.preguntas_frecuentes !== null" class="post__content-text faqs py-12" id="faqs">
                        <div class="heading accordion__heading">
                            <h2 class="accordion__heading-title area-title [&>span]:block [&>span]:text-clamp-xl [&>span]:mb-0"
                                v-html="post.acf.post_faqs.titulo_faqs"></h2>
                        </div>
                        <div class="list accordion__list">
                            <div class="accordion__list--item flex flex-col flex-wrap justify-between py-5 cursor-pointer separador-lista"
                                v-for="contentido in post.acf.post_faqs.preguntas_frecuentes"
                                :key="contentido.faq_subtitle">
                                <div class="accordion__list--item-title flex flex-row justify-between items-center [&>*]:font-normal [&>*]:m-0">
                                    <div class="max-w-[85%] [&>.h4]:text-clamp-base [&>.h4]:mb-0 text-clamp-base mb-0 !font-light"
                                        v-html="contentido.faq_subtitle"></div>
                                    <svg class="size-6 stroke-blue-1 stroke-1" viewbox="0 0 24 24">
                                        <path class="iconV" d="M 12,0 V 24" />
                                        <path class="iconH" d="M 0,12 H 24" />
                                    </svg>
                                </div>
                                <div class="accordion__list--item-descripcion self-end h-0 w-full xl:w-[60%] opacity-0 relative"
                                    v-html="contentido.faq_description"></div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-blue-1 p-6 w-full lg:rounded-3xl z-20"
                        v-if="post.acf && post.acf.quiz && post.acf.quiz.posicion === 'bottom'">
                        <div id="presupuesto" class="lg:px-12 lg:pb-12">
                            <FormsQuiz v-if="post && post.acf" :identificador="'topPage'"
                                :portalId="String(post.acf.quiz.portalid)" :formId="post.acf.quiz.formid"
                                :titulo="post.acf.quiz.titulo_form" />
                        </div>
                    </div>

                </div>
                <aside class="widgets bg-blue-2 p-6 col-[2/-2] xl:col-[13/17] rounded-3xl"
                    v-if="post.acf && !post.acf.quiz || post.acf.quiz.posicion === 'bottom'">
                    <div id="formulario" class="form__wrapper p-2 p-xs-6 ">
                        <FormsCustomForm v-if="post && post.acf" :identificador="'topPage'"
                            :portalId="String(post.acf.formulario.portalid)" :formId="post.acf.formulario.formid" />
                    </div>
                </aside>
            </section>
        </article>
    </main>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useAsyncData, useRouter, useRoute, useNuxtApp } from 'nuxt/app';
import { getPosts } from '@/composables/useApi';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


// Acceder a los parámetros de la ruta
const router = useRouter();
const route = useRoute();

// Importar useBoosterCritical si es necesario
// import useCritical from '#booster/composables/critical';
const { isCritical } = useBoosterCritical({ critical: true });

// Acceder a gsap y lenis desde el contexto de Nuxt
const { $gsap: gsap, $lenis: lenis } = useNuxtApp();

// Define la función para cargar los datos
const loadData = async () => {
    const slug = route.params.slug;
    return getPosts({ slug });
};

// Utiliza `useAsyncData` con un key dinámico y dependencias de reactividad
const { data: post, refresh } = await useAsyncData(`post-${route.params.slug}`, loadData, { watch: [() => route.params.slug], initialCache: false });

// Observador para manejar la recarga de datos cuando cambia el parámetro de ruta
watch(() => route.params.slug, async (newSlug, oldSlug) => {
    if (newSlug !== oldSlug) {
        await refresh();
    }
}, { immediate: true });

// Observador adicional para manejar la lógica específica, como redirecciones basadas en cambios de datos
watch(post, (newPost) => {
    if (!newPost) {
        router.push('/error');
    }
}, { immediate: true });

// Datos YOAST SEO
useHead(() => {
    // Verifica si el post está cargado y tiene la estructura esperada
    if (!post.value || post.value.length === 0 || !post.value.yoast_head_json) {
        return {
            title: 'Cargando...', // Título temporal mientras se cargan los datos
        };
    }

    // Accede al primer elemento del arreglo para obtener los datos de YOAST SEO
    const yoast = post.value.yoast_head_json;

    const link = [
        {
            rel: 'canonical',
            href: (() => {
                // Añadir "www." si no está presente y no es una subdominio diferente
                let canonical = yoast.canonical.startsWith('https://www.') ? yoast.canonical :
                    yoast.canonical.startsWith('https://') ? `https://www.${yoast.canonical.substring(8)}` : yoast.canonical;
                // Asegurar que la URL termina con "/"
                canonical = canonical.endsWith('/') ? canonical : `${canonical}/`;
                return canonical;
            })()
        }
    ];
    const metaTags = [
        { name: 'description', content: yoast.og_description || 'Egos | Clínica de cirugía y medicina estética' },
        { property: 'og:title', content: yoast.og_title },
        { property: 'og:description', content: yoast.og_description },
        { property: 'og:url', content: yoast.og_url },
        { property: 'og:type', content: yoast.og_type },
        { property: 'og:locale', content: yoast.og_locale },
        { property: 'og:site_name', content: yoast.og_site_name },
        { property: 'article:publisher', content: yoast.article_publisher },
        // Twitter Card
        { name: 'twitter:card', content: yoast.twitter_card },
        // Tiempo de lectura de Twitter (Personalizado, considerar adecuación a estándares)
        { name: 'twitter:data1', content: yoast.twitter_misc['Tiempo de lectura'] },
        // Robots
        {
            name: 'robots',
            content: `index=${yoast.robots.index}, follow=${yoast.robots.follow}, max-snippet=${yoast.robots['max-snippet']}, max-image-preview=${yoast.robots['max-image-preview']}, max-video-preview=${yoast.robots['max-video-preview']}`
        },
        // Añadir más tags según sean necesarios
    ];

    // Añadir las imágenes de Open Graph si están disponibles
    if (yoast.og_image && yoast.og_image.length > 0) {
        yoast.og_image.forEach((image) => {
            metaTags.push({ property: 'og:image', content: image.url });
            metaTags.push({ property: 'og:image:width', content: image.width.toString() });
            metaTags.push({ property: 'og:image:height', content: image.height.toString() });
        });
    }

    return {
        title: yoast.title || 'Título del Post',
        link: link,
        meta: metaTags,
    };
});

const initAccordion = async () => {
    const groups = gsap.utils.toArray(".accordion__list--item");
    const animations = [];

    groups.forEach((group, index) => {
        const title = group.querySelector('.accordion__list--item-title');
        const description = group.querySelector('.accordion__list--item-descripcion');
        const iconV = group.querySelector('.iconV');
        const iconH = group.querySelector('.iconH');

        // Establece el estado inicial de manera explícita
        gsap.set(description, { autoAlpha: 0, height: 0, marginTop: 0, marginBottom: 0 });
        gsap.set([iconV, iconH], { rotate: 0, transformOrigin: '50% 50%' });

        // Usa fromTo para definir explícitamente los estados inicial y final
        const tl = gsap.timeline({ paused: true, reversed: true })
            .fromTo(description,
                { autoAlpha: 0, height: 0, marginTop: 0, marginBottom: 0 },
                { duration: 0.2, autoAlpha: 1, height: 'auto', marginTop: '2rem', marginBottom: '2rem' }, 0)
            .fromTo([iconV, iconH],
                { rotate: 0, transformOrigin: '50% 50%' },
                { duration: 0.25, rotate: 45, stagger: 0.05, transformOrigin: '50% 50%' }, '<');

        animations[index] = tl;

        title.addEventListener('click', () => {
            if (tl.reversed()) {
                animations.forEach((anim) => {
                    if (anim !== tl) anim.reverse().then(() => anim.pause());
                });
                tl.play();
            } else {
                tl.reverse();
            }
        });
    });
};

const stickyForm = async () => {
    gsap.registerPlugin(ScrollTrigger)

    let ctx = gsap.context(() => {

        let mm = gsap.matchMedia()
        mm.add("(min-width: 1025px)", () => {
            const form = document.querySelector('#formulario')

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".widgets",
                    pin: form,
                    start: "top 10%",
                    //scrub: 0.5,
                    endTrigger: "footer.footer",
                    end: "top bottom",
                    pinSpacing: false,
                    toggleActions: "restart none none reverse",
                    // markers: true,
                }
            });
        })
    })
}

// Ciclo de vida Mounted
onMounted(async () => {
    await initAccordion()
    await stickyForm()
});
</script>

<style lang="scss" scoped>
    .post__content-image {
        @apply rounded-xl overflow-hidden;
    }
    
    .post__content-text {
        a {
            @apply font-medium text-blue-6;
        }

        h3 {
            @apply text-clamp-lg font-normal;
        }
        
        iframe {
            @apply w-full aspect-video h-fit my-6;
        }
    
        &-areas {
            @apply col-[4/13];
    
            @media (max-width: 1024px) and (orientation: portrait) {
                @apply col-[2/-2];
            }
        }
    }

    
    .post__content-text .faqs .accordion__heading,
    .post__content-text .faqs .accordion__list {
        @apply col-span-full;
    }


    .fullwidth .nav-content {
        @apply lg:col-span-6 xl:!col-start-2 xl:!col-span-4;
    }

    .fullwidth .post__content-areas {
        @apply lg:col-start-7 lg:col-end-17 xl:col-start-6 xl:col-end-16 lg:pr-8
    }

    .fullwidth .breadcrumbs {
        @apply xl:px-[calc(100vw/16+1rem)] mb-8
    }
</style>
