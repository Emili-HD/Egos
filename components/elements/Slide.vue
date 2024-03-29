<template>
   <Swiper :direction="'vertical'" :slidesPerView="'auto'" :freeMode="true" :scrollbar="true" :mousewheel="true"
      :modules="[SwiperFreeMode, SwiperScrollbar, SwiperMousewheel]" class="mySwiper size-full max-h-[600px]">
      <SwiperSlide class="h-auto box-border">
         <div class="team__panel-content-inner">
            <div class="row pr-2 flex flex-row lg:flex-row items-start gap-8" v-if="data.acf.trayectoria.num_colegiadoa">
               <p class="w-72"><strong>Núm. Colegiado/a</strong></p>
               <hr class="w-32 top-3">
               <div class="w-full">
                  <p>{{ data.acf.trayectoria.num_colegiadoa }}</p>
               </div>
            </div>
            <div class="row pr-2 flex flex-row lg:flex-row items-start gap-8" v-if="data.acf.trayectoria.especialidad">
               <p class="w-72"><strong>Especialidad</strong></p>
               <hr class="w-32 top-3">
               <div class="w-full">
                  <p>{{ data.acf.trayectoria.especialidad }}</p>
               </div>
            </div>
            <div class="row pr-2 flex flex-row lg:flex-row items-start gap-8" v-if="data.content.rendered">
               <p class="w-72"><strong>Formación y experiencia</strong></p>
               <hr class="w-32 top-3">
               <div class="w-full" v-html="data.content.rendered"></div>
            </div>
         </div>
      </SwiperSlide>
   </swiper>
</template>

<script setup>
// Props
const props = defineProps({
   data: {
      type: Object
   }
})
</script>

<style lang="scss">
   // .mySwiper {      
   //    &-slide {
   //       height: auto;
   //       -webkit-box-sizing: border-box;
   //       box-sizing: border-box;
   //    }
   // }
</style>
