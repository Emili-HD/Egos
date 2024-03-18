<template>
   <div class="destacado bg-nude-1 w-[85vw] lg:w-[66.6666vw] left-1/2 translate-y-1/2 -translate-x-1/2 rounded-2xl
               flex flex-row items-stretch z-10 text-center lg:text-left" ref="destacado">
      <img class="icon-star absolute left-1/2 top-0 -translate-y-1/2 -translate-x-1/2 w-16 aspect-square z-10" src="/images/icons/rounded-star.svg" alt="">
      <div class="destacado__header py-16 px-12 w-full lg:w-1/2">
         <h4 class="h3 !text-clamp-2xl m-0" v-html="data.destacado.texto_destacado"></h4>
      </div>
      <div class="destacado__image hidden lg:block w-1/2 rounded-2xl" :style="`background-image: url(${data.destacado.imagen_destacado.url})`"></div>
   </div>
</template>

<script setup>
import { ref } from 'vue';

// Estado reactivo
const destacado = ref(null)

// props
const props = defineProps({
   data: {
      type: Object,
   }
})
</script>

<style lang="scss" scoped>
// Etilo vacío
</style>
