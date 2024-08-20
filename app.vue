<template>
    <div v-if="!isGraciasPage"
        class="fixed-button bg-blue-1 fixed top-[calc(100%-4.3rem)] w-full p-4 z-[998] flex flex-row justify-center items-center gap-2 lg:hidden">
        <ElementsButton class="gold text-clamp-xs uppercase" href="#formulario" >
            Cita con el cirujano
        </ElementsButton>
    </div>
    <AppHeader v-if="!isPromotionPage" />
    <NuxtPage />
    <AppFooter />
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useNuxtApp } from '#app';

// const { consentBanner } = useCookiebot({
//     blockingMode: 'auto'
// });
const nuxtApp = useNuxtApp();
const route = useRoute();
const isGraciasPage = ref(false);
const showPresupuestoLink = ref(false);

const isPromotionPage = computed(() => {
    return route.path.startsWith('/promocion/');
});

// const { $lenis: lenis } = useNuxtApp();
// const handleClick = () => {
//     lenis.scrollTo('#formulario', { offset: -20 });
// }
// const pressu = () => {
//     lenis.scrollTo('#presupuesto', { offset: -60 });
// }

const checkPresupuestoLink = () => {
    showPresupuestoLink.value = !!document.getElementById('presupuesto');
}


onMounted( async () => {
    await nextTick()
    // consentBanner();

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
