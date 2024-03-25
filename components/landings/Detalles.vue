<template>
   <section class="detalles md:pb-12 min-h-screen bg-nude-7 flex content-start justify-between items-center flex-wrap">
      <div class="detalles__header p-12 mb-12 flex justify-center items-center gap-4 md:gap-8 text-nude-8 bg-blue-3 w-full">
         <h2 class="h4 mb-0 text-clamp-lg">{{ data.detalles.avalados }}</h2>
         <NuxtImg loading="lazy" class="max-w-[50%]" :src="data.detalles.logo_avalados.url" :alt="data.detalles.logo_avalados.alt" width="250" height="53" />
      </div>
      <div class="consejos p-12 xl:py-40 xl:px-20 flex flex-col xl:flex-row justify-center items-center xl:items-start w-full xl:w-1/2 gap-8" ref="detalles">
         <figure class="icon text-center w-[min(16rem,50vw)]" v-for="icons in data.detalles.consejo" :key="icons.id">
            <NuxtImg loading="lazy" class="bg-nude-5 p-7 mb-4 rounded-2xl w-full" :src="icons.icono.url" alt="" width="220" height="220"/>
            <figcaption v-html="icons.texto_icono"></figcaption>
         </figure>
      </div>
      <div class="bg__detalles py-5 px-3 w-1/2 hidden md:flex flex-col items-center">
         <figure class="bg__detalles-img w-3/4 overflow-hidden h-screen/70 rounded-2xl">
            <NuxtImg loading="lazy" class="absolute object-cover object-center h-full w-full" :src="data.detalles.imagen_avalados.url" :alt="data.detalles.imagen_avalados.alt" />
         </figure>
      </div>
   </section>
</template>

<script setup>
import { ref } from 'vue';

// Estado reactivo
const detalles = ref(null)

// props
const props = defineProps({
   data: {
      type: Object,
   }
})
</script>

<style lang="scss" scoped>
// empty style
</style>
