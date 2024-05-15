<template>
   <section v-if="data.acf.tratamientos_home.categorias_home"
      class="tratamientos girl min-h-[100vh] flex flex-col justify-center items-center">
      <ElementsGirl />
      <div class="loquehacemos w-full">
         <h2 class="home__services-title font-canela font-thin py-12 px-16 xp:p-24 text-left w-full text-clamp-lg lg:text-clamp-3xl"
            v-html="data.acf.tratamientos_home.title_categories"></h2>
         <div class="foryou flex flex-col xl:flex-row justify-around items-center gap-24">
            <div class="notes flex flex-col justify-between items-start aspect-square rounded-2xl overflow-hidden p-8 w-[40vh] will-change-transform 
                        [&:nth-child(1)]:!bg-nude-7 [&:nth-child(2)]:!bg-nude-5 [&:nth-child(3)]:!bg-nude-4"
               v-for="skill in data.acf.loquehacemos" :key="skill.id">
               <img loading="lazy" class="sLogo max-w-full w-28 xl:w-24 border border-current rounded-xl"
                  :src="skill.icono.url" :alt="skill.icono.alt" width="96" height="96" />
               <div class="[&>*]:!leading-6 [&>h3]:!font-canela [&>h3]:!font-semibold [&>h3]:!mb-1 [&>h3]:!text-xl [&>p]:!mb-0"
                  v-html="skill.skill"></div>
            </div>
         </div>
      </div>
   </section>
   <section v-if="data.acf.tratamientos_home.categorias_home" class="tratamientos" id="tratamientos">

      <div class="home__services bg-white flex flex-row justify-center items-center flex-wrap min-h-[100vh] w-full xl:px-20 pt-16 overflow-hidden">
         <div class="home__services-description w-full pt-12 px-10 xl:px-24 pb-12 text-center">
            <p class="text-balance w-full" v-html="data.acf.tratamientos_home.descripcion_categorias"></p>
         </div>
         <div class="text-left flex flex-col justify-start items-start p-4 [&>h3]:!text-clamp-sm w-full lg:w-1/4" v-for="(categoryId, index) in data.acf.tratamientos_home.categorias_home" :key="`category-${categoryId}-${index}`">
            <div class="card__wrapper min-w-full xl:min-w-[360px] xl:max-w-full opacity-100 px-2 xl:px-0 relative [&.active]:opacity-100">
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

<style lang="scss" scoped>
// estilo vacío
</style>
