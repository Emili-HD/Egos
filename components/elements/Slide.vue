<template>
   <swiper :direction="'vertical'" :slidesPerView="'auto'" :freeMode="true" :scrollbar="true" :mousewheel="true"
      :modules="modules" class="mySwiper">
      <swiper-slide>
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
      </swiper-slide>
   </swiper>
</template>

<script setup>
import { ref } from 'vue';

// Importa los componentes de Swiper para Vue.js
// import { Swiper, SwiperSlide } from 'swiper/vue';

// Importa los estilos de Swiper
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/scrollbar';

// Importa los módulos requeridos de Swiper
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';

// Props
const props = defineProps({
   data: {
      type: Object
   }
})

// Módulos
const modules = [FreeMode, Scrollbar, Mousewheel];

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
