<template>
   <section class="resenas px-8 xl:px-24 py-10 xl:py-20 mb-0" ref="resenas">
      <div class="resenas__header">
         <h2>Reseñas</h2>
         <ElementsDivider />
      </div>
      <Swiper
         :slidesPerView="1"
         :spaceBetween="30"
         :pagination="{
            clickable: true,
         }"
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
         :modules="[SwiperPagination]"
         class="mySwiper"
      >
         <SwiperSlide v-for="comment in data.resenas.resena">
            <h3 class="h6">{{ comment.nombre }}</h3>
            <div class="stars pb-4" :data-stars="comment.valoracion">
               <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 172.4 33.6">
                  <g>
                     <defs>
                        <path id="SVGID_1_" d="M17.8,1.1L23,11.5l11.6,1.7l-8.4,8.1l2,11.4l-10.3-5.4L7.5,32.7l2-11.4l-8.4-8.1l11.6-1.7L17.8,1.1z
                        M52,1.1l5.2,10.4l11.6,1.7l-8.4,8.1l2,11.4L52,27.3l-10.3,5.4l2-11.4l-8.4-8.1l11.6-1.7L52,1.1z M86.2,1.1l5.2,10.4l11.6,1.7
                        l-8.4,8.1l2,11.4l-10.3-5.4l-10.3,5.4l2-11.4l-8.4-8.1L81,11.5L86.2,1.1z M120.4,1.1l5.2,10.4l11.6,1.7l-8.4,8.1l2,11.4l-10.3-5.4
                        L110,32.7l2-11.4l-8.4-8.1l11.6-1.7L120.4,1.1z M154.6,1.1l5.2,10.4l11.6,1.7l-8.4,8.1l2,11.4l-10.3-5.4l-10.3,5.4l2-11.4
                        l-8.4-8.1l11.6-1.7L154.6,1.1z" stroke="#CCB780" />
                     </defs>
                     <clipPath id="SVGID_2_">
                        <use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
                     </clipPath>
                     <rect class="bg-stars [clip-path:url(#SVGID_2_)] fill-gold-1" x="0.7" y="0.1" :width="calculateWidth(comment.valoracion)" height="33.5" fill="#CCB780"/>
                     <use xlink:href="#SVGID_1_"  style="overflow:visible;fill:none;stroke:#CCB780;stroke-miterlimit:10;"/>
                  </g>
               </svg>
            </div>
            <p class="comentario">{{ comment.texto }}</p>
         </SwiperSlide>
      </Swiper>
   </section>
</template>

<script setup>
import { ref } from 'vue';

// Estado reactivo
const resenas = ref(null)

// props
const props = defineProps({
   data: {
      type: Object,
   }
})

// Función para calcular el ancho basado en la valoración
function calculateWidth(valoracion) {
  const percentage = valoracion * 20;
  const width = 171.7 * (percentage / 100);
  return `${width}`;
}
</script>

<style lang="scss" scoped>

// .bg-stars{clip-path:url(#SVGID_2_);fill:#CCB780;}
.resenas {
   background-color: var(--nude-5);
   min-height: 80lvh;
   display: flex;
   flex-direction: column;
   align-items: center;

   &__header {
      width: 80%;
      text-align: center;

      @media (max-width: 767px) {
         width: 100%;

         h2 {
            font-size: calc(var(--font-size) * 2.3);
         }
      }
   }
}

.swiper {
  width: 100%;
//   height: max(400px, 40lvh);
  
  &-slide {
    text-align: left;
    background: var(--nude-8);
    border-radius: var(--radius-s);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 2rem;

    h3 {
      margin-bottom: 1rem;
    }

    .stars svg {
      width: 6rem;
    }
    
    & > p {
      font-size: calc(var(--font-size) * .8);
    }
  }
}


</style>
