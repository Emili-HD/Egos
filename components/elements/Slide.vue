<template>
   <Swiper :direction="'vertical'" :slidesPerView="'auto'" :freeMode="true" :scrollbar="true" :mousewheel="true"
      :modules="[SwiperFreeMode, SwiperScrollbar, SwiperMousewheel]" class="mySwiper">
      <SwiperSlide>
         <div class="team__panel-content-inner">
            <div class="row pr-2" v-if="data.acf.trayectoria.num_colegiadoa">
               <p><strong>Núm. Colegiado/a</strong></p>
               <hr>
               <div>
                  <p>{{ data.acf.trayectoria.num_colegiadoa }}</p>
               </div>
            </div>
            <div class="row pr-2" v-if="data.acf.trayectoria.especialidad">
               <p><strong>Especialidad</strong></p>
               <hr>
               <div>
                  <p>{{ data.acf.trayectoria.especialidad }}</p>
               </div>
            </div>
            <div class="row pr-2" v-if="data.content.rendered">
               <p><strong>Formación y experiencia</strong></p>
               <hr>
               <div v-html="data.content.rendered"></div>
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
   .mySwiper {
      width: 100%;
      height: 100%;
      max-height: 600px;
      
      &-slide {
         height: auto;
         -webkit-box-sizing: border-box;
         box-sizing: border-box;
      }
   }
</style>
