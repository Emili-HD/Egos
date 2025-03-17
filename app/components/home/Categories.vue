<template>
   <section v-if="data.categorias_home" class="tratamientos" :id="sectionId">
      <div :class="`${sectionId}-services home__services`">
         <div class="home__services-description">
            <p v-if="data.descripcion_categorias" v-html="data.descripcion_categorias"></p>
            <h2 v-if="data.title_categories" v-html="data.title_categories"></h2>
         </div>
         <div id="ofertas"></div>
         <div class="category__cards [&>h3]:!text-clamp-sm" v-for="(categoryId, index) in data.categorias_home" :key="`category-${categoryId}-${index}`">
            <div class="card__wrapper">
               <HomeCategorySlide :categoryId="categoryId" class="bg-white shadow-2xl shadow-black/10 pb-4 [&>.card-wrapper>.card]:h-full [&>.card-wrapper>.card]:objet-cover [&>.card-wrapper>.card]:object-center [&>.card-wrapper>.card]:w-[90vw] [&>.card-wrapper>.card]:shadow-2xl" />
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
// const { el: target, inView } = useBoosterComponentObserver({
//   trackVisibility: true,
//   delay: 350
// });

const props = defineProps({
   data: Object,
   sectionId: String,
})
</script>

<style lang="scss" scoped>
.home__services {
   @apply bg-crema flex flex-row justify-center items-stretch flex-wrap w-full pt-12 xl:px-20 xl:py-16; 

   &-description {
      @apply w-full pt-0 px-10 xl:px-24 pb-12 text-center;

      & > p {
         @apply text-pretty w-full max-sm:text-left;
      }

      & > h2 {
         @apply max-sm:text-clamp-3xl max-sm:text-left mb-0;
      }
   }

   .category__cards {
      @apply text-left flex flex-col justify-start items-start p-4 w-full sm:w-1/2 2xl:w-1/4;

      .card__wrapper {
         @apply min-w-full min-h-full xl:max-w-full opacity-100 px-2 xl:px-0 relative;
      }
   }
}
</style>
