<template>
    <AppHeader v-if="!isPromotionPage" />
    <NuxtPage />
    <AppFooter />
    <div ref="consentBannerRef" />
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

const consentBannerRef = ref(null)

const { consentBanner } = useCookiebot({
    blockingMode: 'auto'
});

const campanya = ref({});
const fetchCampanas = async () => {
    try {
        const data = await egosSettings('celebraciones');
        campanya.value = data.celebraciones;
    } catch (error) {
        console.error('Error fetching campañas:', error);
    }
};

onMounted(async () => {
    await nextTick()
    fetchCampanas();
    consentBanner(consentBannerRef);
    let observer = null; // Declara el observer en el ámbito del componente

    // Watch para observar cambios en `campanya`
    // watch(campanya, (newCampanya) => {
    //     if (newCampanya?.activar_campana) {
    //         // Asegurarse de que estamos en el lado del cliente
    //         if (typeof window !== 'undefined') {
    //             document.body.classList.add(newCampanya.campana);
    //         }
    //     } else {
    //         if (typeof window !== 'undefined') {
    //             document.body.classList.remove(newCampanya.campana);
    //         }
    //     }
    // });

    document.documentElement.classList.add('blackfriday')


    isGraciasPage.value = route.path === '/gracias/';

    checkPresupuestoLink(); // Initial check in case #presupuesto is already in the DOM

    observer = new MutationObserver(() => {
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
