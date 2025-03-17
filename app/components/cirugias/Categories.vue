<template>
   <section v-if="data.acf.tratamientos_home.categorias_home" class="tratamientos">
      <div class="home__services 
                  after:content-[''] after:absolute after:opacity-10 after:z-[-1] after:border after:border-blue-1 after:rounded-s-full
                  after:size-[95vw] after:left-0 after:top-0 after:translate-y-[55%] after:translate-x-[45%]">
      <div class="text-left flex flex-col justify-start items-start p-8 [&>h3]:!text-clamp-sm" v-for="(categoryId, index) in data" :key="`category-${categoryId}-${index}`">
         <div class="card__wrapper min-w-full xl:min-w-[360px] xl:max-w-[400px] opacity-100 px-2 xl:px-0 relative [&.active]:opacity-100">
            <!-- <CirugiasCategorySlide :categoryId="categoryId" class="[&>.card-wrapper>.card]:h-full  [&>.card-wrapper>.card]:objet-cover [&>.card-wrapper>.card]:object-center [&>.card-wrapper>.card]:w-[90vw] [&>.card-wrapper>.card]:shadow-2xl" /> -->
         </div>
      </div>
            
         <div class="home__services-description w-full pt-12 px-10 xl:px-24 pb-12 text-center">
            <p class="text-balance w-full" v-html="data.acf.tratamientos_home.descripcion_categorias"></p>
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

<style lang="scss" scoped>
.home__services {
   @apply bg-crema flex flex-row justify-start items-center flex-wrap min-h-[100vh] w-full pt-16 overflow-hidden;

   &::before {
      @apply content-[''] absolute opacity-10:z-[-1] border border-blue-1 rounded-s-full size-[75vw] left-1/2 top-1/2 translate-y-[5%] before:translate-x-[35%];
   }
}
</style>
