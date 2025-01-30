<template>
    <main class="site-main" v-if="post">
        <UiBotonCita v-if="post.acf && post.acf.boton_cita" :data="post.acf.boton_cita" />
        <article :class="{ 'fullwidth': post.acf.quiz && post.acf.quiz.posicion === 'top' }">
            <div class="post__header before-gradient mb-12 bg-cover bg-center bg-no-repeat h-[70vh] max-h-[820px] flex flex-col justify-end items-center overflow-hidden"
                v-if="post.acf && !post.acf.quiz || post.acf.quiz.posicion === 'bottom'">
                <UiImage :data="post" class="cover absolute" :preload="true"
                    :aria-labelledby="'post-title-' + post.id" />
                <h1
                    class="font-lora text-nude-8 font-semibold text-center max-lg:text-clamp-4xl w-full xl:max-w-[60vw] z-10 text-balance">
                    {{ post.title.rendered }}
                </h1>
                <div class="size-20 mb-6 border border-nude-8/50 rounded-full flex justify-center items-center z-50 cursor-pointer"
                    @click="scrollToBreadcrumbs">
                    <svg class="arrows scale-50 w-[60px] h-[75px]">
                        <path class="a1" d="M0 0 L30 32 L60 0"></path>
                        <path class="a2" d="M0 20 L30 52 L60 20"></path>
                        <path class="a3" d="M0 40 L30 72 L60 40"></path>
                    </svg>
                </div>
            </div>

            <!-- CABECERA MODIFICADA PARA FORM QUIZ -->
            <div class="post__header before-gradient bg-cover bg-center bg-no-repeat h-[70vh] xl:h-[50vh] flex flex-col justify-center items-center overflow-hidden p-8"
                v-if="post.acf && post.acf.quiz && post.acf.quiz.posicion === 'top'">
                <UiImage :data="post" class="cover absolute" :preload="true"
                    :aria-labelledby="'post-title-' + post.id" />
                <h1
                    class="font-lora text-nude-8 font-semibold text-center max-lg:text-clamp-4xl w-full xl:max-w-[60vw] z-10 mt-20 text-balance">
                    {{ post.title.rendered }}</h1>
                <div class="size-20 mb-6 border border-nude-8/50 rounded-full flex justify-center items-center z-50 cursor-pointer"
                    @click="scrollToBreadcrumbs">
                    <svg class="arrows scale-50 w-[60px] h-[75px]">
                        <path class="a1" d="M0 0 L30 32 L60 0"></path>
                        <path class="a2" d="M0 20 L30 52 L60 20"></path>
                        <path class="a3" d="M0 40 L30 72 L60 40"></path>
                    </svg>
                </div>
            </div>

            <!-- FORM QUIZ SÓLO SI ESTÁ PRESENTE -->
            <aside class="bg-blue-1 p-6 w-full lg:w-[70vw] xl:w-[45vw] m-auto mb-20 lg:-mt-36 lg:rounded-xl z-20"
                v-if="post.acf && post.acf.quiz && post.acf.quiz.posicion === 'top'">
                <div id="calculadora" class="lg:px-12 lg:pb-12">
                    <FormsQuiz v-if="post && post.acf" :identificador="'topPage'"
                        :portalId="String(post.acf.quiz.portalid)" :formId="post.acf.quiz.formid"
                        :titulo="post.acf.quiz.titulo_form" :name="post.title.rendered" />
                </div>
            </aside>

            <!-- Breadcrumbs -->
            <div id="breadcrumbs"
                class="breadcrumbs flex gap-4 p-4 divide-x divide-blue-1/50 font-nunito rounded-xl shadow-lg w-[calc(100%-4rem)] mx-auto mb-8"
                style="scroll-margin-top: 5rem">
                <NuxtLink class="pl-4 mb-0 leading-none font-normal" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 2048 2048">
                        <path fill="currentColor"
                            d="m1024 165l941 942l-90 90l-83-82v805h-640v-640H896v640H256v-805l-83 82l-90-90zm640 1627V987l-640-640l-640 640v805h384v-640h512v640z" />
                    </svg>
                </NuxtLink>
                <NuxtLink class="pl-4 mb-0 leading-none font-normal" to="/blog/">Blog</NuxtLink>
                <div class="pl-4 mb-0 leading-none italic opacity-50">{{ post.title.rendered }}</div>
            </div>

            <section class="post__content px-2 pb-10 gap-1 xl:gap-4 grid grid-cols-[repeat(16,_minmax(0,_1fr))]">

                <div class="post__content-areas p-0 xl:py-6 col-[2/-2] xl:col-[2/11]">

                    <div class="flex flex-col lg:flex-row gap-4 mb-12">
                        <div v-if="post.acf.doctores_relacionados" class="bg-nude-6 p-6 rounded-xl w-full lg:w-[calc(50%-1rem)]">
                            <div v-if="doctor">
                                <div class="overflow-hidden size-full flex items-center gap-8">
                                    <div class="size-32 aspect-square overflow-hidden">
                                        <UiImage :data="doctor" class="cover absolute object-center inset-0"
                                            :aria-labelledby="'doctor-title-' + doctor.id" />
                                    </div>
                                    <div class="w-[calc(100%-10rem)]">
                                        <p class="w-full mb-3 border-b border-b-blue-1/50">Artículo revisado por:</p>
                                        <h3 class="text-clamp-base mb-0"><strong>{{ doctor.title.rendered }}</strong>
                                        </h3>
                                        <p class="text-clamp-xs mb-3">{{ doctor.acf.trayectoria.especialidad }}</p>
                                        <UiButton :to="relativeDoctorLink"
                                            class="button gold text-clamp-xs size-full rounded-2xl block uppercase !px-2 !py-1 !no-underline">
                                            más información</UiButton>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <p>Cargando información del doctor...</p>
                            </div>
                        </div>
                        <div v-if="post.acf?.cirugias_relacionadas" class="bg-nude-6 p-6 rounded-xl w-full lg:w-[calc(50%-1rem)]">
                            <div v-if="cirugia">
                                <div class="overflow-hidden size-full flex items-center gap-8">
                                    <div class="size-32 aspect-square rounded-full overflow-hidden">
                                        <UiImage :data="cirugia" class="cover absolute object-center inset-0"
                                            :aria-labelledby="'cirugia-title-' + cirugia.id" />
                                    </div>
                                    <div class="w-[calc(100%-10rem)]">
                                        <!-- <p class="w-full mb-3 border-b border-b-blue-1/50">Artículo revisado por:</p> -->
                                        <h3 class="text-clamp-base mb-3"><strong>{{ cirugia.title.rendered }}</strong>
                                        </h3>
                                        <UiButton :to="relativeCirugiaLink"
                                            class="button gold text-clamp-xs size-full rounded-2xl block uppercase !px-2 !py-1 !no-underline">
                                            más información</UiButton>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <p>Cargando información de la clínica...</p>
                            </div>
                        </div>
                    </div>

                    <div v-if="post.content.rendered"
                        class="[&_h2]:font-lora [&_p]:font-nunito post__content-text pb-4 border-none"
                        v-html="post.content.rendered">
                    </div>
                    <div class="post__content-text pb-4" v-for="(content, index) in post.acf.areas_de_contenido"
                        :id="`area-${index}`">
                        <h2 class="area-title font-lora text-clamp-2xl xl:text-clamp-3xl">{{ content.titulo_area }}</h2>
                        <div class="[&_p]:font-nunito" v-html="content.contenido_area"></div>
                        <div class="post__content-image" v-if="content.imagen_area && content.imagen_area.url">
                            <img loading="lazy" :src="content.imagen_area.url" :srcset="content.imagen_area.srcset"
                                :width="content.imagen_area.width" :height="content.imagen_area.height"
                                :alt="content.imagen_area.alt" />
                        </div>
                    </div>

                    <div id="recomendaciones" v-if="post.acf.post_description.titulo_recomendaciones"
                        class="post__content-text recomendaciones pb-6">
                        <div class="heading accordion__heading">
                            <h2 class="accordion__heading-title area-title text-clamp-2xl [&>span]:block [&>span]:text-clamp-xl [&>span]:mb-0"
                                v-html="post.acf.post_description.titulo_recomendaciones"></h2>
                            <div class="accordion__description pb-2"
                                v-html="post.acf.post_description.descripcion_recomendaciones">
                            </div>
                        </div>
                        <div class="list accordion__list">
                            <div class="accordion__list--item flex flex-col flex-wrap justify-between py-2 cursor-pointer separador-lista"
                                v-for="item in post.acf.post_description.secciones_del_post" :key="item.post_subtitle">
                                <div
                                    class="accordion__list--item-title flex flex-row justify-between items-center [&>*]:font-normal [&>*]:m-0">
                                    <div class="max-w-[85%] [&>.h4]:text-clamp-base [&>.h4]:mb-0 text-clamp-base mb-0 !font-semibold"
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

                    <div v-if="post.acf.post_faqs && post.acf.post_faqs.preguntas_frecuentes !== null"
                        class="post__content-text faqs py-12" id="faqs">
                        <div class="heading accordion__heading">
                            <h2 class="accordion__heading-title area-title text-clamp-2xl [&>span]:block [&>span]:text-clamp-xl [&>span]:mb-0"
                                v-html="post.acf.post_faqs.titulo_faqs"></h2>
                        </div>
                        <div class="list accordion__list">
                            <div class="accordion__list--item flex flex-col flex-wrap justify-between py-2 cursor-pointer separador-lista"
                                v-for="contentido in post.acf.post_faqs.preguntas_frecuentes"
                                :key="contentido.faq_subtitle">
                                <div
                                    class="accordion__list--item-title flex flex-row justify-between items-center [&>*]:font-normal [&>*]:m-0">
                                    <div class="max-w-[85%] [&>.h4]:text-clamp-base [&>.h4]:mb-0 text-clamp-base mb-0 !font-semibold"
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

                    <div class="bg-blue-1 p-6 w-full lg:rounded-xl z-20"
                        v-if="post.acf && post.acf.quiz && post.acf.quiz.posicion === 'bottom'">
                        <div id="presupuesto" class="lg:px-12 lg:pb-12">
                            <FormsQuiz v-if="post && post.acf" :identificador="'topPage'"
                                :portalId="String(post.acf.quiz.portalid)" :formId="post.acf.quiz.formid"
                                :titulo="post.acf.quiz.titulo_form" :name="post.title.rendered" />
                        </div>
                    </div>
                </div>
                <aside class="widgets bg-blue-2 p-8 col-[1/-1] lg:col-[2/-2] xl:col-[12/17] rounded-xl"
                    v-if="post.acf && !post.acf.quiz || post.acf.quiz.posicion === 'bottom'">
                    <div id="formulario" class="form__wrapper p-2 p-xs-6 lg:sticky lg:top-44">

                        <FormsEsteticaForm
                            v-if="post && post.acf && post.acf.formulario && post.acf.formulario.portalid === '25632462'"
                            :identificador="'topPage'" :portalId="String(post.acf.formulario.portalid)"
                            :formId="post.acf.formulario.formid" :name="post.title.rendered" />

                        <FormsCirugia v-else-if="post && post.acf && post.acf.formulario" :identificador="'topPage'"
                            :portalId="String(post.acf.formulario.portalid)" :formId="post.acf.formulario.formid" />

                    </div>
                </aside>
            </section>
        </article>
    </main>
</template>

<script setup>
    import { useBreadcrumbData } from '@/composables/useBreadcrumbJson';
    import { usePostData } from '@/composables/blogPostingSchema';
    import { usePostFaqJson } from '@/composables/usePostFaqsJson';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import { provide } from 'vue';

    // Acceder a los parámetros de la ruta
    const router = useRouter();
    const route = useRoute();

    provide('routePath', route.fullPath);

    // Acceder a gsap y lenis desde el contexto de Nuxt
    const { $gsap: gsap } = useNuxtApp();

    // Define la función para cargar los datos
    const loadData = async () => {
        const slug = route.params.slug;
        const post = await getPosts({ slug });
        return post;
    };

    // Utiliza `useAsyncData` con un key dinámico y dependencias de reactividad
    const { data: post, refresh } = await useAsyncData(`post-${route.params.slug}`, loadData, { watch: [() => route.params.slug], initialCache: true });

    // Step 2: Definir una referencia para el doctor relacionado
    const doctor = ref(null);
    
    // Step 3: Usar watchEffect para cargar el doctor solo cuando el post esté disponible
    watchEffect(async () => {
        if (post.value && post.value.acf?.doctores_relacionados) {
            try {
                const doctorId = post.value.acf.doctores_relacionados[0];
                doctor.value = await getEquipo({ id: doctorId });
                
            } catch (error) {
                console.error("Error fetching doctor:", error);
            }
        }
    });
    
    // Step 4: Definir una referencia para la clínica relacionada
    const cirugia = ref(null);

    // Step 3: Usar watchEffect para cargar la clínica solo cuando el post esté disponible
    watchEffect(async () => {
        if (post.value && post.value.acf?.cirugias_relacionadas) {
            try {
                const cirugiaId = post.value.acf.cirugias_relacionadas[0];
                cirugia.value = await getTratamiento({ id: cirugiaId });

            } catch (error) {
                console.error("Error fetching doctor:", error);
            }
        }
    });

    const relativeDoctorLink = computed(() => {
        if (doctor.value?.link) {
            // Remover el dominio y dejar solo la parte relativa de la URL
            const url = new URL(doctor.value.link);
            return url.pathname;
        }
        return '';
    });

    const relativeCirugiaLink = computed(() => {
        if (cirugia.value?.link) {
            // Remover el dominio y dejar solo la parte relativa de la URL
            const url = new URL(cirugia.value.link);
            return url.pathname;
        }
        return '';
    });

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

    function scrollToBreadcrumbs() {
        const breadcrumbsSection = document.getElementById("breadcrumbs");
        if (breadcrumbsSection) {
            breadcrumbsSection.scrollIntoView({ behavior: "smooth" });
        }
    }

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

    // Ciclo de vida Mounted
    onMounted(async () => {
        await initAccordion()
    });


    let tratamiento = post
    const { generateBreadcrumbData } = useBreadcrumbData(tratamiento);
    const breadcrumbJson = generateBreadcrumbData();

    let postJsonLd = null;
    // Genera el JSON-LD para el post solo si servicetype existe
    if (post.value) {
        const { generatePostData } = usePostData(post);
        postJsonLd = generatePostData();
    }

    let faqJsonLd = null;
    // Genera el JSON-LD para las FAQs
    if (Array.isArray(post.value.acf?.post_faqs?.preguntas_frecuentes)) {
        faqJsonLd = usePostFaqJson(post.value.acf.post_faqs);
    }


    const { generateYoastHead } = useYoastHead(post);
    const yoastHead = generateYoastHead();    

    useHead({
        script: [
            // JSON-LD para las migas de pan
            breadcrumbJson && {
                type: 'application/ld+json',
                children: JSON.stringify(breadcrumbJson),
            },
            // JSON-LD para el blogPosting
            postJsonLd && {
                type: 'application/ld+json',
                children: JSON.stringify(postJsonLd),
            },
            // JSON-LD para las preguntas frecuentes
            faqJsonLd && {
                type: 'application/ld+json',
                children: JSON.stringify(faqJsonLd),
            },
        ].filter(Boolean), // Filtra los valores nulos o undefined
        ...yoastHead,
    });
</script>

<style scoped>
    .arrows {
        z-index: 99;
    }

    .arrows path {
        width: 2.5rem;
        stroke: #ffffff;
        fill: transparent;
        stroke-width: 1px;
        animation: arrow 2s infinite;
        -webkit-animation: arrow 2s infinite;
    }

    .arrows path.a1 {
        animation-delay: -1s;
        -webkit-animation-delay: -1s;
        /* Safari 和 Chrome */
    }

    .arrows path.a2 {
        animation-delay: -0.5s;
        -webkit-animation-delay: -0.5s;
        /* Safari 和 Chrome */
    }

    .arrows path.a3 {
        animation-delay: 0s;
        -webkit-animation-delay: 0s;
        /* Safari 和 Chrome */
    }

    @keyframes arrow {
        0% {
            opacity: 0
        }

        40% {
            opacity: 1
        }

        80% {
            opacity: 0
        }

        100% {
            opacity: 0
        }
    }

    .post__content-image {
        @apply rounded-xl overflow-hidden;
    }

    :deep(.post__content-text) {
        scroll-margin-top: 7.5rem;
        @apply mb-8 rounded-xl;

        &:nth-child(1) {
            @apply p-0 mb-8 rounded-xl bg-transparent;

            p {
                @apply text-clamp-base;
            }
        }

        a {
            @apply font-medium text-gold-2;
        }

        h3 {
            @apply text-clamp-lg font-semibold font-nunito mt-6;
        }

        h4 {
            @apply text-clamp-base font-semibold font-nunito mt-6;
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


    .post__content-text.faqs {
        @apply bg-transparent p-0 mt-12 border-none;

        & .accordion__heading,
        & .accordion__list {
            @apply col-span-full;
        }
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
