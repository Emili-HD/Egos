<template>
    <main class="site-main caso-real bg-nude-8 grid grid-cols-16 min-h-[100vh] mb-0">
        <UiBotonCita v-if="casoreal && casoreal.acf && casoreal.acf.boton_cita" :data="casoreal.acf.boton_cita" />
        <div class="caso-real__content col-[1/-1] lg:col-start-1 lg:col-span-11 grid grid-cols-subgrid">
            <header class="caso-real__heading pt-32 lg:col-start-2 col-[2_/_span_14] lg:col-span-9 group"
                v-if="casoreal && casoreal.title">
                <h1 class=" text-clamp-4xl xl:text-clamp-6xl">{{ casoreal.title.rendered }}</h1>
                <div v-if="casoreal.acf.vimeo_video"
                    class="caso-real__video video__player col-start-2 col-span-10 flex flex-row justify-center items-start">
                    <div class="w-full bg-nude-5 h-[400px] lg:h-[650px] rounded-2xl">
                        <VimeoPlayer :videoId="casoreal.acf.vimeo_video" />
                    </div>
                </div>
            </header>
            <section
                class="caso-real__description lg:col-start-2 col-[2_/_span_14] lg:col-span-9 row-start-2 py-8 lg:py-20"
                v-if="casoreal && casoreal.content">
                <div v-html="processedContent"
                    class="[&>h2_a]:font-lora [&>h2]:text-clamp-3xl [&>h2_b]:font-normal [&>h3]:text-clamp-2xl [&>h3_b]:font-normal [&>p:has(img)]:w-full [&>p:has(img)]:inline-flex [&>p:has(img)]:flex-col lg:[&>p:has(img)]:flex-row [&>p:has(img)]:justify-center [&>p:has(img)]:gap-2 [&>p:has(img)_img]:w-full lg:[&>p:has(img)_img]:w-full [&>p:has(img)]:max-md:w-[100%] [&>p>img]:w-full [&>p>a]:text-blue-2 [&>p>a]:font-semibold [&>p>a]:underline">
                </div>
                <div class="content">
                    <div v-for="bloque in casoreal.acf?.contenido">
                        <div v-html="bloque.texto" class="[&_a]:text-blue-2 [&_a]:font-semibold [&_a]:underline mb-8">
                        </div>
                        <div class="media flex flex-col lg:flex-row gap-4" v-if="bloque.selector_media === 'Imágenes'">
                            <div v-for="img in bloque.galeria">
                                <img :src="img.imagen.url" :alt="img.imagen.alt" :srcset="img.imagen.scrset"
                                    :width="img.imagen.width" :height="img.imagen.height"
                                    :sizes="img.imagen.sizes.medium" class="rounded-lg" />
                            </div>
                        </div>
                        <div v-else-if="bloque.selector_media === 'Vídeo'">
                            <VimeoPlayer :videoId="bloque.video" />
                        </div>
                    </div>
                </div>
            </section>

            <NuxtLazyHydrate when-idle>
                <div class="flex flex-col xl:flex-row gap-4 col-[2_/-2] mb-20">

                    <!-- Doctor del caso real -->
                    <div v-if="casoreal.acf.dr_comment" id="doctores"
                        class="flex flex-col w-full xl:w-1/3 rounded-xl overflow-hidden shadow-2xl shadow-gold-2/20"
                        data-anchor="doctores">
                        <!-- <h2 class="h4 col-span-full lg:text-center">Qué opina el doctor</h2> -->
                        <div class="doctor__info" v-for="({ doctor, comentario }, index) in doctorsWithComments"
                            :key="doctor.ID">
                            <div class="doctor__info-wrapper">
                                <div class="doctor__info-image h-2/5 overflow-hidden">
                                    <img loading="lazy" :src="doctor.featured_image" :alt="doctor.post_title"
                                        :aria-labelledby="'doctor-title-' + doctor.ID" class="w-full" />
                                </div>
                                <div class="doctor__info-description bg-white p-8 rounded-xl -mt-3 h-3/5 grid grid-rows-[min-content]"
                                    v-if="doctor.post_title">
                                    <!-- Nombre del doctor -->
                                    <h3 class="text-clamp-base text-left mb-2 font-nunito font-semibold">
                                        {{ doctor.post_title }}
                                    </h3>
                                    <!-- Comentario del doctor -->
                                    <p class="text-clamp-xs leading-tight mb-4 text-left">
                                        {{ comentario }}
                                    </p>
                                    <!-- Botón de enlace a la página del doctor -->
                                    <UiButton :to="relativeDoctorLink(doctor.permalink)"
                                        class="button gold uppercase !py-3 self-end">
                                        más información
                                    </UiButton>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Clínicas en que se hizo la intervención -->
                    <div
                        class="flex flex-col justify-between w-full xl:w-1/3 rounded-xl overflow-hidden shadow-2xl shadow-gold-2/20">
                        <div class="links-clinicas col-[2/-2] h-full lg:col-start-8 lg:col-span-4 lg:self-center flex flex-wrap max-lg:justify-between gap-1 items-center"
                            v-for="clinica in casoreal.acf.clinicas_relacionadas" :key="clinica.ID">
                            <div class="h-2/5 w-full">
                                <img loading="lazy" :src="clinica.featured_image" class="w-full" />
                            </div>
                            <div class="h-3/5 w-full bg-white p-8 rounded-xl -mt-3 grid grid-rows-[min-content]">
                                <h2 class="text-clamp-base font-nunito font-semibold">{{
                                    casoreal.acf.titulo_cirugias_relacionadas }}</h2>
                                <div v-html="casoreal.acf.texto_cirugias_relacionadas" class="[&>p]:leading-tight">
                                </div>
                                <UiButton :to="formatPermalink(clinica.permalink)"
                                    class="self-end blue uppercase text-xs text-nude-8 !px-4 !py-4 max-lg:!w-full lg:min-w-[calc(50%-1rem)]">
                                    {{ clinica.post_excerpt }}</UiButton>
                            </div>
                        </div>
                    </div>

                    <!-- Cirugía que se realizó -->
                    <div
                        class="flex flex-col justify-between w-full xl:w-1/3 border-none rounded-xl overflow-hidden shadow-2xl shadow-gold-2/20">
                        <div v-for="cirugia in casoreal.acf.cirugias_testimonios"
                            class="links-clinicas h-full col-[2/-2] lg:col-start-8 lg:col-span-4 lg:self-center flex flex-wrap max-lg:justify-between gap-1 items-center">
                            <div class="h-2/5 w-full">
                                <img loading="lazy" :src="cirugia.featured_image" class="w-full" />
                            </div>
                            <div class="h-3/5 bg-white p-8 rounded-xl -mt-3 grid grid-rows-[min-content]">
                                <h2 class="text-clamp-base font-nunito font-semibold">{{
                                    casoreal.acf.titulo_cirugias_testimonios }}</h2>
                                <div v-html="casoreal.acf.texto_cirugias_testimonios" class="[&>p]:leading-tight"></div>
                                <UiButton :key="cirugia.ID" :to="formatPermalink(cirugia.permalink)"
                                    class="self-end blue uppercase text-xs text-nude-8 !px-4 !py-4 max-lg:!w-full lg:min-w-[calc(50%-1rem)]">
                                    Más info sobre {{ casoreal.acf.titulo_cirugias_testimonios }}</UiButton>
                            </div>
                        </div>
                    </div>
                </div>

            </NuxtLazyHydrate>
        </div>
        <aside
            class="form__wrapper [html:not(.blackfriday)_&]:bg-blue-2 [.blackfriday_&]:bg-blackfriday col-[1_/_span_16] lg:col-start-12 lg:col-span-5 p-8 lg:p-16 lg:pt-20 xl:pt-28 xl:pb-20 h-full"
            v-if="casoreal && casoreal.acf">
            <FormsEsteticaForm v-if="casoreal.acf.formulario" :identificador="'formulario'"
                :portalId="String(casoreal.acf.formulario.portalid)" :formId="casoreal.acf.formulario.formid"
                :name="casoreal.title.rendered" :route="route.fullPath" class="sticky top-44" />
        </aside>
    </main>
</template>

<script setup>
    import { ref, watch, nextTick, computed, provide } from 'vue';
    import { useAsyncData, useRouter, useRoute, useNuxtApp } from 'nuxt/app';
    import { getTestimonios } from '@/composables/useApi';

    const router = useRouter();
    const route = useRoute();
    const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp();

    provide('routePath', route.fullPath);
    
    // Uso de `useAsyncData` para cargar los datos del caso real
    const { data: casoreal, refresh } = await useAsyncData(
        `casoreal-${route.params.slug}`,
        async () => {
            try {
                const response = await getTestimonios({ slug: route.params.slug });

                // Si no hay respuesta válida, retornar null
                if (!response || Object.keys(response).length === 0) {
                    return null;  // Retornar null si no se encuentra el caso real
                }

                return response;  // Retornar los datos si existen
            } catch (error) {
                console.error(`Error fetching casoreal ${route.params.slug}:`, error);
                return null;  // Retornar null en caso de error
            }
        },
        {
            watch: [() => route.params.slug],  // Observar el `slug` para recargar los datos
            initialCache: true  // Deshabilitar la caché inicial
        }
    );

    // Observa el valor de `casoreal` y redirige si es null
    watchEffect(() => {
        if (!casoreal.value) {
            // Redirigir a la página de error si no se encuentra el caso real
            router.push('/error');
        }
    });

    const rawContent = computed(() => casoreal.value.content.rendered)

    const processedContent = computed(() => {
        if (!rawContent.value) return ''

        return rawContent.value
            // Reemplaza solo URLs relativas que empiezan con `//`
            .replace(/(src|srcset)="\/\/([^"]*)"/g, '$1="https://test.clinicaegos.com/$2"')
            // Asegúrate de que las URLs absolutas incorrectamente formadas no se dupliquen
            .replace(/https:\/\/test\.clinicaegos\.com\/https:\/\/test\.clinicaegos\.com\//g, 'https://test.clinicaegos.com/')
            // Corrige cualquier caso de `srcset` que todavía use el dominio principal
            .replace(/https:\/\/clinicaegos\.com/g, 'https://test.clinicaegos.com')
    })

    watch(
        () => route.params.slug,
        async (newSlug, oldSlug) => {
            if (newSlug !== oldSlug) {
                await refresh();
            }
        },
        { immediate: true }
    );

    const waitForElement = (selector, timeout = 10000) => {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            const interval = setInterval(() => {
                const element = document.querySelector(selector);
                if (element) {
                    clearInterval(interval);
                    resolve(element);
                } else if (Date.now() - startTime > timeout) {
                    clearInterval(interval);
                    reject(new Error(`Element ${selector} not found within timeout`));
                }
            }, 100);
        });
    };

    const doctorsWithComments = ref([]);

    // Asignar los datos de los doctores directamente desde `casoreal.acf.doctores_relacionados`
    if (casoreal.value && casoreal.value.acf?.dr_comment) {
        doctorsWithComments.value = casoreal.value.acf.dr_comment.map(commentObj => ({
            doctor: commentObj.doctores_relacionados[0],  // Asumimos que hay un doctor en `doctores_relacionados`
            comentario: commentObj.comentario
        }));
    }

    const relativeDoctorLink = (link) => {
        if (link) {
            const url = new URL(link);
            return url.pathname;
        }
        return '';
    };

    // Función que formatea el permalink para devolver la ruta relativa
    const formatPermalink = (permalink) => {
        return permalink.replace('https://clinicaegos.com', '')
    }

    const stickyForm = async () => {
        await nextTick(); // Espera a la próxima renderización
        gsap.registerPlugin(ScrollTrigger);

        try {
            const form = await waitForElement('.form-landing');
            // console.log('Form:', form);

            if (form) {
                let mm = gsap.matchMedia();
                mm.add("(min-width: 1025px)", () => {
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: ".form__wrapper",
                            pin: form,
                            start: "top 0%",
                            end: "top bottom",
                            endTrigger: "footer.footer",
                            pinSpacing: false,
                            toggleActions: "restart none none reverse",
                            // markers: true,
                        }
                    });
                });
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // Ciclo de vida Mounted
    onMounted(async () => {
        await nextTick(); // Espera a la próxima renderización
        // await stickyForm();
        await injectStructuredData(); // Asegúrate de que esta función también se ejecute después de la renderización
    });

    let tratamiento = casoreal;
    const { generateBreadcrumbData } = useBreadcrumbData(tratamiento);
    const breadcrumbJson = generateBreadcrumbData();

    const { generateYoastHead } = useYoastHead(casoreal);
    const yoastHead = generateYoastHead();

    let structuredData = null;

    const injectStructuredData = async () => {
        structuredData = {
            "@context": "http://schema.org",
            "@type": casoreal.value.acf.datos.type,
            "name": casoreal.value.acf.datos.name,
            "address": [
                {
                    "@type": casoreal.value.acf.datos.adress.type,
                    "name": casoreal.value.acf.datos.adress.addresscountry,
                }
            ],
            "aggregateRating": [
                {
                    "@type": casoreal.value.acf.datos.aggregaterating.type,
                    "ratingValue": casoreal.value.acf.datos.aggregaterating.ratingvalue,
                    "reviewCount": casoreal.value.acf.datos.aggregaterating.reviewcount,
                }
            ],
        };

        // Inyecta el structuredData en el head
        useHead({
            script: [
                breadcrumbJson && {
                    type: 'application/ld+json',
                    children: JSON.stringify(breadcrumbJson),
                },
                structuredData && {
                    type: 'application/ld+json',
                    children: JSON.stringify(structuredData),
                },
            ].filter(Boolean), // Filtra los valores nulos o undefined
            ...yoastHead,
        });
    };

    // Ejecuta la función asíncrona y espera su finalización
    injectStructuredData().catch(console.error);
</script>

<style></style>
