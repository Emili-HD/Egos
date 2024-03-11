<template>
   <div class="detalles mb-5 py-1" v-if="detallesData">
      <div class="detalles__intervencion py-1" v-for="detalles in detallesData"
         :key="detalles.texto_detalles">
         <div v-html="detalles.texto_detalles"></div>
      </div>
   </div>
</template>

<script setup>
// Props
const props = defineProps({
   detallesData: {
      type: Array,
      required: true
   }
})
</script>
