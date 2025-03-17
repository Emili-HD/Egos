<template>
  <div v-if="legalError">Error al cargar el contenido legal.</div>
  <main v-else class="page site-main grid grid-cols-16 w-full">
    <section class="legal col-[2/-2] xl:col-[5/-5] py-40">
      <h1>{{ legal.title.rendered }}</h1>
      <div class="content" v-html="legal.content.rendered"></div>
    </section>
  </main>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app';
import { getPage } from '@/composables/useApi'; // Asegúrate de que useFetch contiene la lógica actualizada para fetch

const { data: legal, legalError } = await useAsyncData(() => getPage(16119))

useHead(() => {
  const link = [
    { 
      rel: 'canonical', href: 'https://www.clinicaegos.com/politica-de-cookies/' 
    }
  ];

  return {
    title: 'Política de Cookies - Clínica EGOS',
    link: link,
  };
});
</script>


<style lang="scss" scoped>
// Estilos vacíos
</style>
