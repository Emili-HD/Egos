<template>
    <div v-if="error">Error al cargar los datos: {{ error }}</div>
    <main v-else class="site-main" v-if="home && home.acf">
        <UiBotonCita :data="home.acf.boton_cita" />
        <HomeWellcome :data="home" />
        <NuxtLazyHydrate when-idle>
            <LazyHomeCategories v-if="home.acf.tratamientos_home.categorias_home" :data="home.acf.tratamientos_home"
                sectionId="tratamientos" />
            <LazyHomeCategories v-if="home.acf.ofertas_cirugias_home.categorias_home"
                :data="home.acf.ofertas_cirugias_home" sectionId="ofertas-cirugias" />
        </NuxtLazyHydrate>
        <NuxtLazyHydrate when-idle>
            <ElementsHablan :data="home.acf" />
        </NuxtLazyHydrate>
        <HomeTestimonios />
        <NuxtLazyHydrate when-idle>
            <LazyFormsPiceCita :portalId="String(home.acf.formulario.portalid)" :formId="home.acf.formulario.formid" :tipo="home.acf.formulario.tipo_de_formulario" :name="home.title.rendered" />
        </NuxtLazyHydrate>
        <NuxtLazyHydrate when-idle>
            <LazyHomeAcordeon :data="home.acf.acordeon_cirugias" />
        </NuxtLazyHydrate>
        <NuxtLazyHydrate when-idle>
            <LazyHomeEspecialists />
        </NuxtLazyHydrate>
        <section v-if="home.acf.descripcion_equipo" class="flex flex-col-reverse lg:flex-row justify-center items-center gap-[calc(100%/16)] px-[calc(100%/16)] min-h-vh/80">
            <div class="aspect-video w-full lg:w-1/2">
                <VimeoPlayer :videoId="home.acf.descripcion_equipo.video" />
            </div>
            <div class="w-full lg:w-1/2 py-8">
                <h2>{{ home.acf.descripcion_equipo.titulo }}</h2>
                <p>{{ home.acf.descripcion_equipo.descripcion }}</p>
            </div>
        </section>
        <!-- <NuxtLazyHydrate when-idle>
            <ElementsPremios />
        </NuxtLazyHydrate> -->
        <NuxtLazyHydrate when-idle>
            <ElementsInfluencers />
        </NuxtLazyHydrate>
    </main>
</template>

<script setup>
const route = useRoute();

provide('routePath', route.fullPath);

const { data: home, error } = await useAsyncData(() => getPage(8))
const categoriasHome = computed(() => home?.acf?.tratamientos_home?.categorias_home || []);
const { data: cirugias, error: cirugiasError } = await useAsyncData('cirugia', () => getTratamiento({ getAll: true }));

// Obtener los premios del composable
const { awards } = useAwardsSchema();

// Convertir los premios a JSON-LD
const awardsJsonLd = JSON.stringify(awards);

// Generar JSON-LD para todas las cirugías
const { generateSchema } = useCirugiaServiceSchema(cirugias);
const schemaData = generateSchema();

// Genera los metadatos de Yoast
const { generateYoastHead } = useYoastHead(home);
const yoastHead = generateYoastHead();

useHead({
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify(schemaData)
        }
    ],
    ...yoastHead,
});

onMounted(() => {
    // injectStructuredData()
})

</script>
