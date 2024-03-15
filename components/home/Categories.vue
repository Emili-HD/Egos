<template>
   <section v-if="data.acf.tratamientos_home.categorias_home" class="tratamientos girl min-h-[100vh] flex flex-col justify-center items-center">
      <ElementsGirl />
      <div class="loquehacemos w-full">
         <h2 class="home__services-title p-8 xp:p-24 text-left w-full" v-html="data.acf.tratamientos_home.title_categories"></h2>
         <div class="foryou flex flex-col xl:flex-row justify-around items-center gap-24">
            <div class="notes flex flex-col justify-between items-start aspect-square rounded-2xl overflow-hidden p-8 w-[40vh] will-change-transform 
                        [&:nth-child(1)]:!bg-[var(--nude-7)] [&:nth-child(2)]:!bg-[var(--nude-5)] [&:nth-child(3)]:!bg-[var(--nude-4)]" 
                  v-for="skill in data.acf.loquehacemos" :key="skill.id">
               <img loading="lazy" class="sLogo max-w-full w-28 xl:w-24 border border-current rounded-xl" :src="skill.icono.url" alt="">
               <div class="[&>*]:!leading-6 [&>h3]:!font-semibold [&>h3]:!mb-1 [&>h3]:!text-xl [&>p]:!mb-0" v-html="skill.skill"></div>
            </div>
         </div>
      </div>
   </section>
   <section v-if="data.acf.tratamientos_home.categorias_home" class="tratamientos">
      <div class="home__services bg-white flex flex-row justify-start items-center flex-wrap h-[100vh] w-full pt-16 overflow-hidden">
         <div class="home__services-inner flex flex-row justify-start items-center min-h-[40vh] p-0">
            <div class="card__wrapper min-w-[100vw] xl:min-w-[33vw] opacity-100 px-10 xl:px-24 relative" v-for="categoryId in data.acf.tratamientos_home.categorias_home" :key="categoryId">
               <HomeCategorySlide :categoryId="categoryId" />
            </div>

         </div>
         <div class="home__services-description w-full pt-12 px-10 xl:px-24 pb-12">
            <p v-html="data.acf.tratamientos_home.descripcion_categorias"></p>
         </div>
      </div>
   </section>
</template>

<script setup>
import { onMounted } from 'vue';
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';

const { $gsap: gsap } = useNuxtApp();

const props = defineProps({
   data: {
      type: Object,
      required: true,
   }
})
</script>

<style lang="scss" scoped>
   .none {position: relative}
</style>
