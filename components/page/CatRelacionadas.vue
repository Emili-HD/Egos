<template>
   <section class="cirugias col-[1_/_span_16] mb-36 pt-0" ref="categorias">
      <div class="cirugias__grid mt-5 grid grid-cols-[repeat(16,_minmax(0_,1fr))] gap-1">
         <h2 class="cirugias__heading col-[1_/_span_16] my-12 text-center w-full">{{ data.cirugias.titulo_cirugias }}</h2>
         <div class="cirugias__grid-inner grid grid-cols-[repeat(16,_minmax(0_,1fr))] col-[2_/_span_14] gap-2">
            <div class="card__wrapper col-[1_/_span_16] xl:col-span-4" v-for="categoryId in data.cirugias.cirugias_relacionadas" :key="categoryId">
               <HomeCategorySlide :categoryId="categoryId" :classes="'aspect-[2/3]'" />
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>

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
