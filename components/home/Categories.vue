<template>
   <section v-if="data.acf.tratamientos_home.categorias_home" class="tratamientos" id="tratamientos">
      <div id="ofertas" class="home__services bg-white flex flex-row justify-center items-center flex-wrap min-h-[100vh] w-full xl:px-20 py-16 overflow-hidden">
         <div class="home__services-description w-full pt-12 px-10 xl:px-24 pb-12 text-center">
            <p class="text-balance w-full" v-if="data.acf.tratamientos_home.descripcion_categorias" v-html="data.acf.tratamientos_home.descripcion_categorias"></p>
            <h2 v-if="data.acf.tratamientos_home.title_categories" v-html="data.acf.tratamientos_home.title_categories"></h2>
         </div>
         <div class="text-left flex flex-col justify-start items-start p-4 [&>h3]:!text-clamp-sm w-full sm:w-1/2 2xl:w-1/4 " v-for="(categoryId, index) in data.acf.tratamientos_home.categorias_home" :key="`category-${categoryId}-${index}`">
            <div class="card__wrapper min-w-full xl:max-w-full opacity-100 px-2 xl:px-0 relative [&.active]:opacity-100">
               <HomeCategorySlide :categoryId="categoryId" class="[&>.card-wrapper>.card]:h-full  [&>.card-wrapper>.card]:objet-cover [&>.card-wrapper>.card]:object-center [&>.card-wrapper>.card]:w-[90vw] [&>.card-wrapper>.card]:shadow-2xl" />
            </div>
         </div>
      </div>
   </section>
   <section v-if="data.acf.ofertas_cirugias_home.categorias_home" class="tratamientos" id="ofertas-cirugias">
      <div id="ofertas-cirugias" class="home__services bg-white flex flex-row justify-center items-center flex-wrap min-h-[100vh] w-full xl:px-20 py-16 overflow-hidden">
         <div class="home__services-description w-full pt-12 px-10 xl:px-24 pb-12 text-center">
            <p class="text-balance w-full" v-if="data.acf.ofertas_cirugias_home.descripcion_categorias" v-html="data.acf.ofertas_cirugias_home.descripcion_categorias"></p>
            <h2 v-if="data.acf.ofertas_cirugias_home.title_categories">{{ data.acf.ofertas_cirugias_home.title_categories }}</h2>
         </div>
         <div class="text-left flex flex-col justify-start items-start p-4 [&>h3]:!text-clamp-sm w-full sm:w-1/2 2xl:w-1/4 " v-for="(categoryId, index) in data.acf.ofertas_cirugias_home.categorias_home" :key="`category-${categoryId}-${index}`">
            <div class="card__wrapper min-w-full xl:max-w-full opacity-100 px-2 xl:px-0 relative [&.active]:opacity-100">
               <HomeCategorySlide :categoryId="categoryId" class="[&>.card-wrapper>.card]:h-full  [&>.card-wrapper>.card]:objet-cover [&>.card-wrapper>.card]:object-center [&>.card-wrapper>.card]:w-[90vw] [&>.card-wrapper>.card]:shadow-2xl" />
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
const props = defineProps({
   data: {
      type: Object,
      required: true,
   }
})
</script>

<style scoped>
@media (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {
   .foryou {
      @apply flex-row flex-wrap justify-center px-16 gap-4;
   }

   .foryou .notes {
      @apply w-[42vw]
   }
}

@media (min-width: 768px) and (max-width: 1180px) and (orientation: landscape) {
   .foryou {
      @apply flex-row flex-wrap justify-center px-16 gap-4;
   }

   .foryou .notes {
      @apply w-[28vw]
   }

   .foryou .notes .sLogo {
      @apply max-w-16
   }
}

@media (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
   .foryou {
      @apply flex-row flex-wrap justify-center px-16 gap-4;
   }

   .foryou .notes {
      @apply w-[40vw]
   }

   .foryou .notes .sLogo {
      @apply max-w-16
   }
}
</style>
