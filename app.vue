<template>
  <div
    v-if="!isGraciasPage"
    class="fixed-button bg-blue-1 fixed lg top-[calc(100%-4.5rem)] w-full p-4 z-[998] flex flex-row justify-center items-center lg:hidden"
  >
    <ElementsButton
      class="gold"
      href="#formulario"
      @click.passive="handleClick"
    >
      Cita con el cirujano
    </ElementsButton>
  </div>
  <AppHeader critical v-if="!isPromotionPage" />
  <NuxtPage />
  <AppFooter />
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isGraciasPage = ref(false);

const isPromotionPage = computed(() => {
  return route.path.startsWith('/promocion/');
});

const handleClick = () => {
  const { $lenis: lenis } = useNuxtApp();
  lenis.scrollTo('#formulario', { offset: -20 });
}

onMounted(() => {
  setTimeout(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'hs-script-loader';
    script.async = true;
    script.defer = true;
    script.src = '//js-eu1.hs-scripts.com/143602274.js';
    document.body.appendChild(script);
  
    isGraciasPage.value = route.path === '/gracias/';
  }, 1500);
});

</script>

<style>
html.lenis, html.lenis body {
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
</style>
