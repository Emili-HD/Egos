<template>
   <div class="detalles mb-5 py-1" v-if="detallesData">
      <div class="detalles__intervencion py-1 bg-gold-3/50 even:bg-blue-1/50 h-full" v-for="detalles in detallesData"
         :key="detalles.texto_detalles">
         <div v-html="detalles.texto_detalles"></div>
      </div>
   </div>
</template>

<script setup>

const props = defineProps({
   detallesData: {
      type: Array,
      required: true
   }
})
</script>
