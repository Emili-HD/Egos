<template>
   <section class="testimonios bg-gold-2 px-8 xl:px-24 py-10 pb-60 xl:pt-20 mb-0" ref="testimonios">
      <div class="testimonios__header pt-6">
         <h2>{{ data.testimonios.titulo }}</h2>
         <ElementsDivider />
         <div class="h6 text-center mb-6" v-if="data.testimonios && data.testimonios.descripcion" v-html="data.testimonios.descripcion"></div>
      </div>
      <div class="testimonios__videos">
         <figure class="testimonios__videos-item min-w-[25vw] md:w-[calc(50%-.5rem)] xl:w-[30%]" v-for="testimonio in data.testimonios.videos">
            <div v-if="testimonio.video_vimeo" class="video__player rounded-xl overflow-hidden">
               <div class="size-full aspect-[9/16]">
                  <VimeoPlayer :videoId="testimonio.video_vimeo" />
               </div>
            </div>
         </figure>
      </div>
   </section>
</template>

<script setup>
import { ref } from 'vue';

// Estado reactivo
const testimonios = ref(null)

// props
const props = defineProps({
   data: {
      type: Object,
   }
})
</script>

<style lang="scss" scoped>
:deep(.divider) {
   .sLogo {
      @apply fill-nude-8 after:bg-nude-8;
   }
}

.testimonios {
   @apply min-h-vh text-nude-8 flex flex-col items-center;

   &__header {
      @apply w-full text-center;
   }

   &__videos {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 3rem;
      width: 100%;

      @media (max-width: 767px) {
         flex-direction: column;
      }

      .video__player {
         :deep(.plyr) {
            min-height: 60lvh;
         }
      }
   }
}
</style>
