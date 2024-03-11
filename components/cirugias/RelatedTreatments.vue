<template>
  <section class="tratamientos__wrapper py-24 my-0" id="relacionadas" ref="related">
    <div class="tratamientos__services" data-color="#ffffff">
      <div class="cards__title mb-12">
        <h2 class="h3">{{ treatmentsData.titulo_relacionados }}</h2>
      </div>
      <div class="tratamientos__relacionados">
        <div class="card__wrapper" v-for="categoryId in treatmentsData.cirugias_relacionadas" :key="categoryId">
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

<style>
.tratamientos {
  padding: unset;
}

.tratamientos__services {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  gap: 1rem;
  
  .cards__title {
    grid-column: 1/-1;
    text-align: center;

    h2 {
      font-size: calc(var(--font-size) * 2.5);
    }
  }
  
  .tratamientos__relacionados {
    grid-column: 2/-2;
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    gap: 1rem;
    
    .card__wrapper {
      grid-column: span 4;

      .card {
        display: flex;

 
      }

      @media (max-width: 767px) {
        grid-column: span 16;
      }
    }
  }
  
}
</style>
