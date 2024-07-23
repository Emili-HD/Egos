<template>
    <!-- <div ref="cookieDeclarationRef"></div> -->
    <div v-if="!isGraciasPage"
        class="fixed-button bg-blue-1 fixed top-[calc(100%-4.3rem)] w-full p-4 z-[998] flex flex-row justify-center items-center gap-2 lg:hidden">
        <ElementsButton class="gold text-clamp-xs uppercase" href="#formulario" @click.passive="handleClick">
            Cita con el cirujano
        </ElementsButton>
    </div>
    <AppHeader critical v-if="!isPromotionPage" />
    <NuxtPage />
    <AppFooter />
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useNuxtApp } from '#app';
    
const { consentBanner } = useCookiebot({
    blockingMode: 'auto'
});
const nuxtApp = useNuxtApp();
const route = useRoute();
const isGraciasPage = ref(false);
const showPresupuestoLink = ref(false);

const isPromotionPage = computed(() => {
    return route.path.startsWith('/promocion/');
});

const { $lenis: lenis } = useNuxtApp();
const handleClick = () => {
    lenis.scrollTo('#formulario', { offset: -20 });
}
const pressu = () => {
    lenis.scrollTo('#presupuesto', { offset: -60 });
}

const checkPresupuestoLink = () => {
    showPresupuestoLink.value = !!document.getElementById('presupuesto');
}

consentBanner();

onMounted(() => {
//   cookieDeclaration(cookieDeclarationRef);

  setTimeout(() => {
    // Añadir el script de HubSpot
    const hsScript = document.createElement('script');
    hsScript.type = 'text/javascript';
    hsScript.id = 'hs-script-loader';
    hsScript.async = true;
    hsScript.defer = true;
    hsScript.src = '//js-eu1.hs-scripts.com/143602274.js';
    document.body.appendChild(hsScript);

    // Añadir el script de Facebook Pixel
    const fbScript = document.createElement('script');
    fbScript.type = 'text/javascript';
    fbScript.charset = 'utf-8';
    fbScript.defer = true;
    fbScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1695692394291035');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(fbScript);

    // Añadir el noscript de Facebook Pixel
    const noScript = document.createElement('noscript');
    noScript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1695692394291035&ev=PageView&noscript=1" />`;
    document.body.appendChild(noScript);

    isGraciasPage.value = route.path === '/gracias/';
  }, 2000);

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
</style>
