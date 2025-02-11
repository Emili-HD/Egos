<template>
    <div v-if="error">
        <p>{{ error.message }}</p>
    </div>

    <main
        class="page site-main grid grid-cols-[repeat(16,_minmax(0,_1fr))] [.estetica_&]:bg-crema [.estetica_&]:text-vermell"
        v-if="pages">
        <UiBotonCita v-if="pages.acf" :data="pages.acf.boton_cita" />
        <PageHeading :data="pages" />
        <NuxtLazyHydrate when-idle>
            <LazyCirugiasEntryText :data="pages" class="mt-12" />
            <LazyPageCatRelacionadas :data="pages.acf" />
        </NuxtLazyHydrate>
        <NuxtLazyHydrate when-idle>
            <FormsPiceCita v-if="pages.acf && pages.acf.formulario" :titulo="`¿No encuentras tu cirugía?`"
                :portalId="String(pages.acf.formulario.portalid)" :formId="pages.acf.formulario.formid"
                :tipo="pages.acf.formulario.tipo_de_formulario" :name="pages.title.rendered" :route="route.fullPath" />
            <div class="clear-both"></div>
        </NuxtLazyHydrate>
        <NuxtLazyHydrate when-idle>
            <section v-if="pages.acf && pages.acf.hero && pages.acf.hero.texto_imagen"
                class="quote font-base text-balance normal-case font-semibold py-20 xl:py-40 w-full col-[1_/_span_16] grid grid-cols-subgrid">
                <div v-html="pages.acf.hero.texto_imagen"
                    class="col-start-1 xl:col-start-4 col-span-full xl:col-span-10  max-sm:px-8 max-lg:px-12 max-xl:px-16 content__header-title blue-1 w-full p-0 [&>p]:font-semibold [&>p]:leading-normal [&>p]:text-clamp-xl lg:[&>p]:text-clamp-4xl">
                </div>
            </section>
        </NuxtLazyHydrate>
        <NuxtLazyHydrate when-idle>
            <PageRecomendaciones v-if="pages.acf" :data="pages.acf" />
        </NuxtLazyHydrate>
    </main>
</template>

<script setup>
    import { usePagesStore } from '@/stores/page';
    import { useBreadcrumbData } from '@/composables/useBreadcrumbJson';
    import { useProcedureData } from '@/composables/useMedicalProcedureSchema';
    import { provide } from 'vue';

    const router = useRouter();
    const route = useRoute();
    const error = ref(null);
    provide('routePath', route.fullPath);

    const pagesStore = usePagesStore();
    let pages = ref(null); // Iniciar como null para evitar acceder a undefined

    try {
        await pagesStore.fetchPage(route.params.slug);
        pages.value = pagesStore.pages[route.params.slug];

        if (!pages.value) {
            throw createError({
                statusCode: 404,
                message: 'Página no encontrada',
            });
        }
    } catch (err) {
        error.value = err;
    }

    // Si hay un error, lanzar el error para que Nuxt maneje el 404
    if (error.value) {
        throw createError({
            statusCode: 404,
            message: error.value.message || 'Página no encontrada',
        });
    }

    // SEO y JSON-LD
    const { generateYoastHead } = useYoastHead(pages);
    const yoastHead = generateYoastHead();

    const { generateBreadcrumbData } = useBreadcrumbData(pages);
    const breadcrumbJson = generateBreadcrumbData();

    let procedureJsonLd = null;
    if (pages.value?.acf?.datos?.procedureType) {
        const { generateProcedureData } = useProcedureData(pages);
        procedureJsonLd = generateProcedureData();
    }

    useHead({
        htmlAttrs: {
            class: route.path.includes('/medicina-estetica') ? 'estetica' : '',
        },
        script: [
            breadcrumbJson && {
                type: 'application/ld+json',
                children: JSON.stringify(breadcrumbJson),
            },
            procedureJsonLd && {
                type: 'application/ld+json',
                children: JSON.stringify(procedureJsonLd),
            },
        ].filter(Boolean),
        ...yoastHead,
    });

    onMounted(() => {
        if (route.path.includes('/medicina-estetica')) {
            document.documentElement.classList.add('estetica');
        }
    });
</script>
