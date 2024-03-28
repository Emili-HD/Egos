<template>
  <section class="tratamientos__wrapper py-12 xl:py-24 my-0" id="relacionadas" ref="related">
    <div class="tratamientos__services flex flex-col flex-wrap items-center gap-0 lg:gap-4" data-color="#ffffff">
      <div class="cards__title mb-12 col-[2/-2]">
        <h2 class="h3 text-center">{{ treatmentsData.titulo_relacionados }}</h2>
      </div>
      <div class="tratamientos__relacionados col-[2/-2] flex flex-row flex-wrap gap-4">
        <div class="card__wrapper w-full max-w-[100vw] lg:max-w-[40vw] xl:max-w-[20vw]" v-for="categoryId in treatmentsData.cirugias_relacionadas" :key="categoryId">
          <HomeCategorySlide :categoryId="categoryId" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// Definir props
const props = defineProps({
  treatmentsData: {
    type: Object, // Ajusta el tipo según lo que esperes recibir
    required: true
  },
});

// Estado reactivo para los datos relacionados
const related = ref(null);

</script>
