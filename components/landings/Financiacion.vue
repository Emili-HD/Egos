<template>
   <section class="financiacion" ref="financiacion" :style="`background-image: url(${data.financiacion.fondo.url})`">
      <div class="financiacion__content">
         <h2 class="mb-2 text-balance font-bold">{{ data.financiacion.titulo }}</h2>
         <p class="mb-8" v-html="data.financiacion.descripcion"></p>
         <ElementsButton class="pedircita" href="#hubspotLanding">Más Información</ElementsButton>
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
   @apply overlay-blue p-10 mb-0 min-h-screen/40 bg-cover bg-center flex flex-col justify-center items-center;

   &__content {
      @apply text-nude-8 text-center;
   }

   .perdircita {
      @apply mt-4 border-[1px] border-solid border-nude-8/50 bg-transparent px-8 py-2 rounded-3xl uppercase;
   }
}
</style>
