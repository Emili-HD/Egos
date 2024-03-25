<template>
   <div class="detalles bg-blue-1 col-[1_/_span_16] xl:mb-36 px-6 py-12 xl:py-6 flex flex-row flex-wrap justify-between xl:justify-center items-stretch xl:items-center gap-6" v-if="detallesData">
      <div class="detalles__intervencion bg-blue-2 flex flex-col justify-center items-center gap-2 rounded-xl p-4 w-[46.5%] xl:w-[12.5%]" v-for="detalles in detallesData" :key="detalles.texto_detalles">
         <img src="/assets/images/icons/ok.svg" alt=""  width="27" height="27" />
         <div v-html="detalles.texto_detalles"></div>
      </div>
   </div>
</template>

<script setup>
// Props
const props = defineProps({
   detallesData: {
      type: Object,
      required: true
   }
})
</script>
