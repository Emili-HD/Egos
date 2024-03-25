<template>
   <section class="financiacion overlay-blue p-10 mb-0 min-h-screen/40 bg-cover bg-center flex flex-col justify-center items-center" ref="financiacion" :style="`background-image: url(${data.financiacion.fondo.url})`">
      <div class="financiacion__content text-nude-8 text-center">
         <h2 class="mb-2 text-balance font-geomanist font-bold">{{ data.financiacion.titulo }}</h2>
         <p class="mb-8" v-html="data.financiacion.descripcion"></p>
         <ElementsButton class="pedircita mt-4 border-[1px] border-solid border-nude-8/50 bg-transparent px-8 py-2 rounded-3xl uppercase" href="#hubspotLanding" @click.prevent="handleClick">Más Información</ElementsButton>
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

function handleClick() {
  const { $lenis: lenis } = useNuxtApp();
//   console.log('lenis on click', lenis);
  lenis.scrollTo('#hubspotLanding', {offset: -20});
}

</script>

<style lang="scss" scoped>
// empty style
</style>
