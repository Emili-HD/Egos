<template>
    <AppHeader v-if="!isPromotionPage" />
    <NuxtPage />
    <AppFooter />
    <!-- <div ref="cookieDeclarationRef" /> -->
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useNuxtApp } from '#app';

const nuxtApp = useNuxtApp();
const route = useRoute();
const isGraciasPage = ref(false);
const showPresupuestoLink = ref(false);

const isPromotionPage = computed(() => {
    return route.path.startsWith('/promocion/');
});

const checkPresupuestoLink = () => {
    showPresupuestoLink.value = !!document.getElementById('presupuesto');
}

const { data: clinicasData, error: clinicasError } = await useAsyncData(
    'clinicas',
    async () => {
        try {
            const response = await getClinicas();
            return response || []; // Asegurarse de que siempre se retorne un array
        } catch (error) {
            console.error('Error fetching clinicas:', error);
            return []; // En caso de error, retornar un array vacío
        }
    }
);

let businessJsonLd = null;

if (clinicasData && clinicasData.value.length > 0) {
    const { generateBusinessData } = useBusinessData();
    businessJsonLd = generateBusinessData(clinicasData.value);
} else if (clinicasError.value) {
    console.error('Error al cargar las clínicas:', clinicasError.value);
}

useHead({
    script: [
        businessJsonLd && {
            type: 'application/ld+json',
            children: JSON.stringify(businessJsonLd),
        },
    ].filter(Boolean), // Filtra los valores nulos o undefined
});


const { consentBanner } = useCookiebot({
    blockingMode: 'auto'
});
consentBanner();

onMounted( async () => {
    await nextTick()

    isGraciasPage.value = route.path === '/gracias/';

    checkPresupuestoLink(); // Initial check in case #presupuesto is already in the DOM

    const observer = new MutationObserver(() => {
        checkPresupuestoLink();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

onBeforeUnmount(() => {
    observer.disconnect();
});
</script>

<style>
html {
    scroll-behavior: smooth;
}
html.lenis,
html.lenis body {
    height: auto;
}

.lenis.lenis-smooth {
    scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
}

.lenis.lenis-stopped {
    overflow: hidden;
}

.lenis.lenis-smooth iframe {
    pointer-events: none;
}

.cc--anim {
    @apply inset-0 bg-blue-1/80;
}

/* Branding on the banner */
a#CybotCookiebotDialogPoweredbyCybot,
div#CybotCookiebotDialogPoweredByText,
#CookiebotWidget .CookiebotWidget-body .CookiebotWidget-main-logo {
    @apply hidden;
}
</style>
