<template>
    <div v-if="isLoading">
        <p>Cargando...</p>
    </div>

    <div v-else-if="error">
        <p>{{ error.message }}</p>
    </div>

    <main class="page site-main grid grid-cols-[repeat(16,_minmax(0,_1fr))] [.estetica_&]:bg-crema [.estetica_&]:text-vermell" v-if="pages">
        <UiBotonCita v-if="pages && pages.acf" :data="pages.acf.boton_cita" />
        <PageHeading v-if="pages" :data="pages" />
        <NuxtLazyHydrate when-idle>
            <LazyCirugiasEntryText v-if="pages" :data="pages" class="mt-12" />
            <LazyPageCatRelacionadas v-if="pages && pages.acf" :data="pages.acf" />
        </NuxtLazyHydrate>
        <NuxtLazyHydrate when-idle>
            <FormsPiceCita v-if="pages.acf && pages.acf.formulario" :titulo="`¿No encuentras tu cirugía?`"
                :portalId="String(pages.acf.formulario.portalid)" :formId="pages.acf.formulario.formid" :tipo="pages.acf.formulario.tipo_de_formulario"  :name="pages.title.rendered" :route="route.fullPath"/>
            <div class="clear-both"></div>
        </NuxtLazyHydrate>
        <NuxtLazyHydrate when-idle>
            <section v-if="pages.acf && pages.acf.hero && pages.acf.hero.texto_imagen"
                class="quote font-base text-balance normal-case font-semibold py-20 xl:py-40 w-full col-[1_/_span_16] grid grid-cols-subgrid">
                <div v-html="pages.acf.hero.texto_imagen" class="col-start-1 xl:col-start-4 col-span-full xl:col-span-10  max-sm:px-8 max-lg:px-12 max-xl:px-16 content__header-title blue-1 w-full p-0 [&>p]:font-semibold [&>p]:leading-normal [&>p]:text-clamp-xl lg:[&>p]:text-clamp-4xl"></div>
            </section>
        </NuxtLazyHydrate>
        <NuxtLazyHydrate when-idle>
            <PageRecomendaciones v-if="pages.acf" :data="pages.acf" />
        </NuxtLazyHydrate>
    </main>
</template>

<script setup>
    import { useBreadcrumbData } from '@/composables/useBreadcrumbJson';
    import { useProcedureData } from '@/composables/useMedicalProcedureSchema';
    import { getPage } from '@/composables/useApi';
    import { useError } from '#app';
    import { provide } from 'vue';

    const router = useRouter();

    // Estado reactivo para manejar la carga
    const isLoading = ref(true);
    const error = ref(null);
    const route = useRoute();    

    provide('routePath', route.fullPath);

    // Carga dinámica de la página
    const { data: pages, refresh } = await useAsyncData(
        `pages-${route.params.slug}`,
        async () => {
            try {
                isLoading.value = true;
                error.value = null;

                const response = await getPage(route.params.slug);

                // Si no hay contenido, lanzamos un 404
                if (!response || Object.keys(response).length === 0) {
                    throw createError({
                        statusCode: 404,
                        message: 'Página no encontrada'
                    });
                }

                return response;
            } catch (err) {
                error.value = err;

                // Si el error ya es 404, relanzarlo tal cual para que Nuxt muestre la página de error 404
                if (err.statusCode === 404) {
                    throw err;
                } else {
                    // Cualquier otro error (red de servidor, etc.) lanzamos un 500
                    throw createError({
                        statusCode: 500,
                        message: 'Error en el servidor'
                    });
                }
            } finally {
                isLoading.value = false;
            }
        },
        {
            watch: [() => route.params.slug],
            initialCache: false
        }
    );


    watch(() => route.params.slug, async (newSlug, oldSlug) => {
        if (newSlug !== oldSlug) {
            // Llamar explícitamente a `refresh` para recargar los datos
            await refresh();
        }
        // Aquí puedes incluir cualquier lógica adicional necesaria cuando cambie el slug
    }, { immediate: true });

    watch(() => route.params.slug, async (newSlug, oldSlug) => {
        if (newSlug !== oldSlug) {
            // Llamar explícitamente a `refresh` para recargar los datos
            await refresh();
        }
        // Aquí puedes incluir cualquier lógica adicional necesaria cuando cambie el slug
    }, { immediate: true });

    const rAF = () => {
        return new Promise(r => window.requestAnimationFrame(r));
    }

    let htmlClassAdded = false; // Para evitar duplicar clases al navegar entre rutas

    // Función para agregar la clase 'estetica' al body
    function addHtmlClass(className) {
        if (!htmlClassAdded) {
            document.documentElement.classList.add(className);
            htmlClassAdded = true;
        }
    }

    onBeforeMount(async () => {
        // const response = await getTratamiento({ slug: route.params.slug });

        // Verificar si el tratamiento tiene tipo 112
        if (route.path.includes('/medicina-estetica')) {
            addHtmlClass('estetica');
        }
    });

    // Ciclo de vida
    onMounted(async () => {
        await nextTick()
        await rAF()
        if (!pages.value) {
            router.push('/error');
        }
    })

    let tratamiento = pages
    const { generateBreadcrumbData } = useBreadcrumbData(tratamiento);
    const breadcrumbJson = generateBreadcrumbData();

    let yoastHead = {};
    if (pages.value) {
        const { generateYoastHead } = useYoastHead(pages.value);
        yoastHead = generateYoastHead();
    }

    let procedureJsonLd = null;
    // Genera el JSON-LD para el tratamiento solo si servicetype existe
    if (pages.value?.acf?.datos?.procedureType) {
        const { generateProcedureData } = useProcedureData(pages);
        procedureJsonLd = generateProcedureData();
    }

    useHead({
        htmlAttrs: {
            class: route.path.includes('/medicina-estetica/') ? 'estetica' : ''
        },
        script: [
            breadcrumbJson && {
                type: 'application/ld+json',
                children: JSON.stringify(breadcrumbJson),
            },
            // JSON-LD para el procedimiento médico
            procedureJsonLd && {
                type: 'application/ld+json',
                children: JSON.stringify(procedureJsonLd),
            },
        ].filter(Boolean), // Filtra los valores nulos o undefined
        ...yoastHead,
    });
</script>
