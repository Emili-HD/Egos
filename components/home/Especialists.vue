<template>
  <section class="nosotros section__hero grid grid-cols-16 col-[1_/_-1] max-sm:p-4" v-if="pages">
    <header class="home__blog--header col-[2/-2] lg:col-[3/-3] text-center">
      <h2 class="home__blog--header-title heading max-sm:text-clamp-3xl max-sm:text-left max-sm:mb-0">{{ pages.title.rendered }}</h2>
      <div
        class="home__blog--header-content [&>p]:max-sm:text-left"
        v-html="pages.content.rendered"
      ></div>
    </header>
    <ElementsDivider class="col-[3/-3]" />
    <div class=" clear-both"></div>
    <ElementsCardDoctor />
  </section>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app';
import { getPage } from '@/composables/useApi';
import { useScrollStore } from '@/stores/scrollStore';

const scrollStore = useScrollStore();



// Obtener datos
const { data: pages, error: paginaError } = await useAsyncData('paginaEspecial', () => getPage(562), {initialCache: false});

</script>


