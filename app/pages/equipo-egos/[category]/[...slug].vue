<template>
    <main class="site-main doctor bg-nude-8 grid grid-cols-16 mb-0"
        v-if="doctor && Object.keys(doctor).length > 0 && isCategoryValid">
        <UiBotonCita v-if="doctor && doctor.acf && doctor.acf.boton_cita" :data="doctor.acf.boton_cita" />
        <div class="doctor__content col-[1/-1] lg:col-start-1 lg:col-span-11 grid grid-cols-subgrid w-fit min-h-fit">
            <header class="doctor__heading pt-36 lg:col-start-2 col-[2_/_span_14] lg:col-span-9 group"
                v-if="doctor && doctor.title">
                <h1 class="font-lora">{{ doctor.title.rendered }}</h1>
                <div v-if="doctor.acf.video_cabecera"
                    class="caso-real__video video__player col-start-2 col-span-10 flex flex-row justify-center items-start">
                    <div class="w-full bg-nude-5 h-[400px] lg:h-[650px] rounded-2xl">
                        <UiVideo :videoId="doctor.acf.video_cabecera" />
                    </div>
                </div>
                <div v-else-if="doctor.featured_image_data"
                    class="doctor__media col-start-2 col-span-10 flex flex-row justify-center items-start">
                    <div class="w-full bg-nude-5 h-[400px] lg:h-[650px] rounded-2xl overflow-hidden">
                        <UiImage :data="doctor" class="cover absolute" :preload="true" />
                    </div>
                </div>

                <!-- Breadcrumbs -->
                <div id="breadcrumbs"
                    class="breadcrumbs flex gap-4 p-4 divide-x divide-blue-1/50 font-nunito rounded-xl shadow-lg w-full mx-auto mt-8"
                    style="scroll-margin-top: 5rem">
                    <NuxtLink class="pl-4 mb-0 leading-none font-normal" to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 2048 2048">
                            <path fill="currentColor"
                                d="m1024 165l941 942l-90 90l-83-82v805h-640v-640H896v640H256v-805l-83 82l-90-90zm640 1627V987l-640-640l-640 640v805h384v-640h512v640z" />
                        </svg>
                    </NuxtLink>
                    <NuxtLink class="pl-4 mb-0 leading-none font-normal" to="/nuestro-equipo/">Nuestro Equipo</NuxtLink>
                    <div class="pl-4 mb-0 leading-none italic opacity-50">{{ doctor.title.rendered }}</div>
                </div>
            </header>


            <section
                class="doctor__description lg:col-start-2 col-[2_/_span_14] lg:col-span-9 row-start-2 py-8 lg:py-20"
                v-if="doctor && doctor.content">
                <div class="[&p]:font-nunito" v-html="doctor.content.rendered"></div>
                <LazyDoctorInsta v-if="insta && insta.length" :data="insta" :name="doctor.title.rendered"
                    :ruta="route.params.slug" :tipo="'doctor'" />
            </section>
            <section class="col-[2/-2] lg:col-start-2 lg:col-span-9 bg-transparent min-h-max mx-[calc(100% / 16)]">
                <DoctorCirugiasRelacionadas :treatmentsData="doctor.acf"
                    :relatedId="doctor.acf.cirugias_relacionadas" />
            </section>
            <section class="col-[2/-2] lg:col-start-2 lg:col-span-9 bg-transparent min-h-max mx-[calc(100% / 16)]">
                <LazyDoctorResenas :data="reviews" :name="doctor.title.rendered" class="" />
                <NuxtLazyHydrate when-idle>
                    <LazyElementsReviews :ruta="route.params.slug[1]" />
                </NuxtLazyHydrate>
            </section>
        </div>
        <aside
            class="form__wrapper [html:not(.blackfriday)_&]:bg-blue-1 [.blackfriday_&]:bg-blackfriday col-[1_/_span_16] lg:col-start-12 lg:col-span-5 px-8 lg:px-12 py-12 lg:pt-40 lg:pb-20">
            <FormsEsteticaForm v-if="doctor && doctor.acf" :identificador="'formulario'"
                :portalId="String(doctor.acf.portalid)" :formId="doctor.acf.formid" :name="doctor.title.rendered"
                class="lg:sticky lg:top-44" />
            <!-- <FormsCirugia :identificador="'popup'" :portalId="'25632462'" 25632464
                :formId="'196b61c4-eb1f-4d90-8f65-e6c544bd2927'" :name="doctor.title.rendered" />holaaa -->
        </aside>
    </main>
</template>

<script setup>
    import { watch, onMounted, nextTick, provide } from 'vue';
    import { useAsyncData, useRouter, useRoute, useNuxtApp } from 'nuxt/app';
    import { getEquipo, getReviews, getEspecialidades } from '@/composables/useApi';
    import { useBreadcrumbData } from '@/composables/useBreadcrumbJson';
    import { useScrollStore } from '@/stores/scrollStore';

    const router = useRouter();
    const route = useRoute();
    const isLoadingCategory = ref(true);  // Bandera para saber si la categoría se está verificando
    const isCategoryValid = ref(false);

    provide('routePath', route.fullPath);
    // console.log(route.params.slug);

    // Verificar la existencia de la categoría en las especialidades
    const { data: especialidades } = await useAsyncData(
        `especialidades`,
        async () => {
            return await getEspecialidades(); // Llama a la API para obtener especialidades
        }
    );

    // console.log('Category:', route.params.category); // Esto debe devolver "cirugia-estetica"
    // console.log('Slug:', route.params.slug);

    // Una vez cargadas las especialidades, verificar si la categoría es válida
    watchEffect(() => {
        if (especialidades.value) {
            // Comparamos el slug de la categoría con las especialidades
            const categoriaExiste = especialidades.value.some(
                (especialidad) => especialidad.slug === route.params.category
            );

            isCategoryValid.value = categoriaExiste;  // Establecemos si la categoría es válida o no
            isLoadingCategory.value = false;  // Terminamos de verificar la categoría

            if (!isCategoryValid.value) {
                router.push('/error');  // Redirigir si la categoría no es válida
            }
        }
    });

    // Uso de `useAsyncData` para cargar los datos del doctor solo si la categoría es válida
    const { data: doctor, refresh: refreshDoctor } = await useAsyncData(
        `doctor-${route.params.slug}`,
        async () => {
            if (!isCategoryValid.value) {
                return null; // Si la categoría no es válida, no cargar el doctor
            }

            try {
                const response = await getEquipo({ slug: route.params.slug });

                // Si no hay respuesta válida, retornar null
                if (!response || Object.keys(response).length === 0) {
                    return null;
                }

                return response;
            } catch (error) {
                console.error(`Error fetching doctor ${route.params.slug}:`, error);
                return null; // Retornar null en caso de error
            }
        },
        {
            watch: [() => isCategoryValid.value]  // Solo recargar los datos cuando la categoría sea válida
        }

    );
    // console.log('Doctor:', doctor.value);

    // Observa el valor de `doctor`, y redirige si es inválido
    watchEffect(() => {
        if (!isLoadingCategory.value && !doctor.value) {
            router.push('/error');  // Redirigir si el doctor no existe
        }
    });

    const { data: reviews, refresh: refreshReviews } = useAsyncData(`reviews-${route.params.slug[1]}`, () => getReviews({ page: 1, per_page: 100, slug: route.params.slug }), {
        watch: [() => route.params.slug[1]]
    });

    const { data: insta, refresh: refresInsta } = useAsyncData(`insta-${route.params.slug[1]}`, () => getInstaComments({ page: 1, per_page: 100, slug: route.params.slug }), {
        watch: [() => route.params.slug[1]]
    });
    // console.log('Reviews:', route.params.slug);

    watch(
        () => route.params.slug,
        async (newSlug, oldSlug) => {
            if (newSlug !== oldSlug) {
                await Promise.all([refreshReviews()]);
            }
        },
        { immediate: true }
    );
    watch(
        () => route.params.slug,
        async (newSlug, oldSlug) => {
            if (newSlug !== oldSlug) {
                await Promise.all([refresInsta()]);
            }
        },
        { immediate: true }
    );

    // Ciclo de vida Mounted
    onMounted(async () => {
        // Utilizar nextTick para asegurarse de que todas las mutaciones DOM y el estado Vue estén actualizados
        nextTick(async () => {
            // const { $lenis } = useNuxtApp();
            const scrollStore = useScrollStore(); // Asegúrate de que el store se inicialice correctamente aquí

            if (scrollStore.scrollToForm) {
                // $lenis.scrollTo('#formulario', { offset: -20 });
                scrollStore.setScrollToForm(false); // Resetea el estado
            }
        });
    });

    let tratamiento = doctor
    const { generateBreadcrumbData } = useBreadcrumbData(tratamiento);
    const breadcrumbJson = generateBreadcrumbData();

    // Genera los metadatos de Yoast
    const { generateYoastHead } = useYoastHead(doctor);
    const yoastHead = generateYoastHead();

    const injectStructuredData = () => {
        // Crear el objeto JSON-LD para el Physician
        const structuredData = {
            "@context": "http://schema.org",
            "@type": "Physician",
            "name": doctor.value.title.rendered,
            "image": doctor.value.featured_image_data.url,
            "medicalSpecialty": doctor.value.acf.microdatos.medicalspecialty,
            "description": doctor.value.acf.microdatos.description,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": doctor.value.acf.microdatos.streetaddress,
                "addressLocality": doctor.value.acf.microdatos.addresslocality,
                "addressRegion": "España",
                "postalCode": doctor.value.acf.microdatos.postalcode,
                "addressCountry": "ES"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+34 633 696 383",
                "contactType": "Consultation",
                "availableLanguage": [
                    "Spanish"
                ]
            },
            "memberOf": doctor.value.acf.microdatos.memberof.map(member => ({
                "@type": "MedicalOrganization",
                "name": member.name
            })),
            "award": doctor.value.acf.microdatos.awards ? doctor.value.acf.microdatos.awards.map(award => award.award) : [],
            "sameAs": doctor.value.acf.microdatos.rrss.map(social => social.social_url) || [],
            "potentialAction": {
                "@type": "ReserveAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `https://www.clinicaegos.com${route.fullPath}#formulario`,
                    "inLanguage": "es",
                }
            }
        };

        // Crear un array con todas las publicaciones
        const publications = doctor.value.acf.microdatos.publications || [];
        const publicationElements = publications.map(publication => ({
            "@context": "http://schema.org",
            "@type": "MedicalScholarlyArticle",
            "headline": publication.title,
            "author": {
                "@type": "Physician",
                "name": doctor.value.title.rendered
            },
            "datePublished": publication.datePublished,
            "journalName": publication.journalName,
            "url": publication.url
        }));

        // Retornar ambos JSON-LD para inyectarlos con useHead
        return {
            structuredData,
            publicationElements
        };
    };

    // const { structuredData, publicationElements } = injectStructuredData();

    // Verificar si activar_schema es true
    if (doctor.value.acf.activar_schema && doctor.value.acf.activar_schema.includes("true")) {
        const { structuredData, publicationElements } = injectStructuredData();

        // Usar useHead para inyectar el JSON-LD en el head solo si activar_schema es true
        useHead({
            script: [
                {
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify(breadcrumbJson) // Usar innerHTML para insertar JSON-LD como cadena
                },
                {
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify(structuredData) // Usar innerHTML para insertar JSON-LD como cadena
                },
                ...publicationElements.map(publication => ({
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify(publication) // Convertir cada objeto a una cadena JSON
                }))
            ],
            ...yoastHead,
        });
    } else {
        // Si activar_schema no es true, solo inyectar los metadatos de Yoast
        useHead({
            ...yoastHead,
        });
    }
</script>

<style lang="scss">
    // empty style
</style>
