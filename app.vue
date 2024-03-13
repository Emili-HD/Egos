<template>
  <div class="fixed-button bg-blue1 fixed top-[calc(100%-4.5rem)] w-full p-4 z-[998] flex flex-row justify-center items-center block xl:hidden">
    <ElementsButton class="gold pedircita blue1 py-2 px-4 rounded-3xl" href="#formulario" @click.prevent="handleClick">Cita con el cirujano</ElementsButton>
  </div>
    <DelayHydration>
      <AppHeader critical v-if="!isPromotionPage" />
    </DelayHydration>
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <NuxtPage />
        <AppFooter />
      </div>
    </div>
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
  console.log('lenis on click', lenis);
  lenis.scrollTo('#formulario', {offset: -20});
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

<!-- 380x575 -->
