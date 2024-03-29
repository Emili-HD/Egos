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
   <section v-if="data.acf.tratamientos_home.categorias_home" class="tratamientos">

      <div class="home__services bg-white flex flex-row justify-start items-center flex-wrap min-h-[100vh] w-full pt-16 overflow-hidden
                  before:content-[''] before:absolute before:opacity-10 before:z-[-1] before:border before:border-blue-1 before:rounded-s-full
                  before:size-[75vw] before:left-1/2 before:top-1/2 before:translate-y-[5%] before:translate-x-[35%]
                  after:content-[''] after:absolute after:opacity-10 after:z-[-1] after:border after:border-blue-1 after:rounded-s-full
                  after:size-[95vw] after:left-0 after:top-0 after:translate-y-[55%] after:translate-x-[45%]">
            <Swiper 
               :slidesPerView="1"
               :breakpoints="{
                  '768': {
                     slidesPerView: 2,
                     spaceBetween: 40,
                  },
                  '1024': {
                     slidesPerView: 3,
                     spaceBetween: 50,
                  },
               }"
               :spaceBetween="30"
               :scrollbar="{
                  draggable: true,
                  dragSize: 100,
               }"
               :freeMode="{
                  enabled: true,
                  sticky: false,
                  momentumBounce: false,
               }" 
               :mousewheel="{
                  forceToAxis: true,
                  enabled: true,
                  sensitivity: 4,
               }" 
                
               :modules="[ SwiperMousewheel, SwiperFreeMode, SwiperScrollbar]" 
               class="swiperHorizontal !pl-0 lg:!pl-20 w-full [&>.swiper-scrollbar]:!w-[calc(100%-2*20%)] [&>.swiper-scrollbar]:!left-[20%] [&>.swiper-scrollbar]:!bg-nude-1/25 [&>.swiper-scrollbar>.swiper-scrollbar-drag]:!bg-gold-2/50"
               @swiper="onSwiper"
               @touchStart="handleSwipeStart"
               @sliderMove="handleSwipeStart"
               @touchEnd="handleSwipeEnd"
               @transitionStart="handleSwipeStart"
               @transitionEnd="handleSwipeEnd">
            >
               <SwiperSlide class="text-left flex flex-col justify-start items-start p-4 [&>h3]:!text-clamp-sm" v-for="(categoryId, index) in data.acf.tratamientos_home.categorias_home" :key="`category-${categoryId}-${index}`">
                  <div class="card__wrapper min-w-full xl:min-w-[360px] xl:max-w-[400px] opacity-100 px-2 xl:px-0 relative [&.active]:opacity-100">
                     <HomeCategorySlide :categoryId="categoryId" class="[&>.card-wrapper>.card]:h-full  [&>.card-wrapper>.card]:objet-cover [&>.card-wrapper>.card]:object-center [&>.card-wrapper>.card]:w-[90vw] [&>.card-wrapper>.card]:shadow-2xl" />
                  </div>
               </SwiperSlide>
            </Swiper>
         <div class="home__services-description w-full pt-12 px-10 xl:px-24 pb-12 text-center">
            <p class="text-balance w-full" v-html="data.acf.tratamientos_home.descripcion_categorias"></p>
         </div>
      </div>
   </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ScrollTrigger from 'gsap/ScrollTrigger'

const { $gsap: gsap, $lenis: lenis } = useNuxtApp();

// import { Swiper, SwiperSlide } from 'swiper/vue';
// import SwiperCore, { SwiperPagination, SwiperMousewheel, SwiperFreeMode, SwiperScrollbar } from 'swiper';

import { useSwiper } from 'swiper/vue';

// import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

const props = defineProps({
   data: {
      type: Object,
      required: true,
   }
})
// console.log('datos de acf:',props.data.acf.tratamientos_home.categorias_home);

const onSwiper = (swiper) => {
   //  console.log('swiper horizontal activado');
};

const handleSwipeStart = () => {
    document.querySelector('.home__services').setAttribute('data-lenis-prevent', '');
   //  console.log('slide move');
};

const handleSwipeEnd = () => {
    document.querySelector('.home__services').removeAttribute('data-lenis-prevent');
   //  console.log('slide end');
};

</script>

<style lang="scss" scoped>
// estilo vacío
</style>
