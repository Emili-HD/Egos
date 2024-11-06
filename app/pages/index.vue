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
        <NuxtLazyHydrate when-idle>
            <ElementsPremios />
        </NuxtLazyHydrate>
        <NuxtLazyHydrate when-idle>
            <ElementsInfluencers />
        </NuxtLazyHydrate>
    </main>
</template>

<script setup>
import { onMounted, computed, provide } from 'vue';
import { useAsyncData } from 'nuxt/app'
import { getPage } from '@/composables/useApi';

const route = useRoute();

provide('routePath', route.fullPath);

const { data: home, error } = await useAsyncData(() => getPage(8))
const categoriasHome = computed(() => home?.acf?.tratamientos_home?.categorias_home || []);

// Obtener los premios del composable
const { awards } = useAwardsSchema();

// Convertir los premios a JSON-LD
const awardsJsonLd = JSON.stringify(awards);

// Genera los metadatos de Yoast
const { generateYoastHead } = useYoastHead(home);
const yoastHead = generateYoastHead();

useHead({
    // script: [
    //     {
    //         type: 'application/ld+json',
    //         children: awardsJsonLd
    //     }
    // ],
    ...yoastHead,
});

onMounted(() => {
    // injectStructuredData()
})

</script>
