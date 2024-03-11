<template>
   <section class="financiacion py-5 px-10 mb-0 py-xs-12" ref="financiacion" :style="`background-image: url(${data.financiacion.fondo.url})`">
      <div class="financiacion__content">
         <h2 class="mb-2">{{ data.financiacion.titulo }}</h2>
         <p class="mb-8" v-html="data.financiacion.descripcion"></p>
         <ElementsButton class="pedircita mt-4 border-1 border-solid bg-transparent px-8 py-2 rounded-3xl uppercase" href="#hubspotLanding">Más Información</ElementsButton>
      </div>
   </section>
</template>

<script setup>
import { ref, inject } from 'vue';

// Estado reactivo
const financiacion = ref(null)

// props
const props = defineProps({
   data: {
      type: Object,
   }
})
</script>

<style lang="scss" scoped>
.financiacion {
   min-height: 40lvh;
   background-size: cover;
   background-position: center;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;

   &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: var(--blue-1);
      top: 0;
      left: 0;
      opacity: .8;
   }

   &__content {
      color: var(--nude-8);
      text-align: center;

      h2 {
         font-family: var(--font-family-base);
         font-weight: 500;
      }

      // p {margin-bottom: 0;}
   }
}
</style>
