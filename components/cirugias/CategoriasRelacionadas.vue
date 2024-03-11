<template>
   <section class="cirugias" ref="categorias">
      <div class="cirugias__grid mt-5" data-color="#ffffff">
         <h2 class="cirugias__heading">{{ data.cirugias.titulo_cirugias }}</h2>
         <div class="cirugias__grid-inner">
            <div class="card__wrapper" v-for="categoryId in data.cirugias.cirugias_relacionadas" :key="categoryId">
               <HomeCategories :categoryId="categoryId" />
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
import { ref } from 'vue';

const categorias = ref(null)

// Props
const props = defineProps({
   data: {
      type: Object
   }
})

</script>

<style lang="scss" scoped>
</style>
