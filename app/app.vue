<template>
    <AppHeader v-if="!isPromotionPage" />
    <NuxtPage />
    <AppFooter />
    <NuxtPwaManifest />
    <div ref="consentBannerRef" />
    <button v-if="$pwa?.showInstallPrompt" @click="installPWA">
        Instalar Aplicación
    </button>
</template>

<script setup>
    import { computed, onMounted, onBeforeUnmount } from 'vue';
    import { useRoute } from 'vue-router';
    import { useNuxtApp } from '#app';

    const nuxtApp = useNuxtApp();
    const route = useRoute();
    const isGraciasPage = ref(false);
    const showPresupuestoLink = ref(false);
    const { $pwa } = useNuxtApp();

    const installPWA = async () => {
        try {
            await $pwa?.install();
            // Lógica adicional después de la instalación, si es necesario
        } catch (error) {
            console.error('Error durante la instalación de la PWA:', error);
        }
    };

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

    let observer = null; // Declara el observer en el ámbito del componente
    
    onMounted(async () => {
        await nextTick()
        fetchCampanas();
        consentBanner(consentBannerRef);

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

        // document.documentElement.classList.add('blackfriday')


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
