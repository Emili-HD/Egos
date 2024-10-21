<template>
   <section class="cirugias">
      <div class="cirugias__grid mt-5">
         <h2 class="cirugias__heading">{{ data.cirugias.titulo_cirugias }}</h2>
         <div class="cirugias__grid-inner">
            <div class="card__wrapper" v-for="categoryId in data.cirugias.cirugias_relacionadas" :key="categoryId">
               <CirugiasCategories :categoryId="categoryId" />
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>

// Props
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}) // Proporciona un objeto vacío por defecto para evitar errores
  }
});

</script>


<style lang="scss" scoped>
</style>
