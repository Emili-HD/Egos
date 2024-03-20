<template>
  <div
    class="fixed-button bg-blue-1 fixed top-[calc(100%-4.5rem)] w-full p-4 z-[998] flex flex-row justify-center items-center xl:hidden">
    <ElementsButton class="gold" href="#formulario" @click.prevent="handleClick">
      Cita con el cirujano</ElementsButton>
  </div>
  <DelayHydration>
    <AppHeader critical v-if="!isPromotionPage" />
  </DelayHydration>
  <NuxtPage />
  <AppFooter />
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isPromotionPage = computed(() => {
  return route.path.startsWith('/promocion/');
});

function handleClick() {
  const { $lenis: lenis } = useNuxtApp();
  // console.log('lenis on click', lenis);
  lenis.scrollTo('#formulario', { offset: -20 });
}

onMounted(() => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = 'hs-script-loader';
  script.async = true;
  script.defer = true;
  script.src = '//js-eu1.hs-scripts.com/143602274.js';
  document.body.appendChild(script);
});

</script>

<style lang="scss">

html {
  &.lenis, body {
    min-height: 100%;
    height: auto;
  }
}

.lenis {
  &.lenis-smooth {
    scroll-behavior: auto;

    [data-lenis-prevent] {
      overscroll-behavior: contain;
    }

    [data-lenis-prevent-wheel] {
      @media (max-width: 1024px) {
        scroll-behavior: auto;
        overscroll-behavior: auto;
      }
    }
  }

  &.lenis-scrolling {
    iframe {
      pointer-events: none;
    }
  }

  &.lenis-stopped {
    overflow: hidden;
  }
}
</style>
