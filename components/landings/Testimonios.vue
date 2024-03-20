<template>
   <section class="testimonios px-8 xl:px-24 py-10 xl:py-20 mb-0" ref="testimonios">
      <div class="testimonios__header pt-6">
         <h2>{{ data.testimonios.titulo }}</h2>
         <ElementsDivider />
         <p class="h6" v-html="data.testimonios.descripcion"></p>
      </div>
      <div class="testimonios__videos">
         <figure class="testimonios__videos-item min-w-[25vw]" v-for="testimonio in data.testimonios.videos">
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
      fill: var(--nude-8);
   }

   &::after {
      background-color: var(--nude-8);
   }
}

.testimonios {
   min-height: var(--full-height);
   background-color: var(--blue-1);
   color: var(--nude-8);
   display: flex;
   flex-direction: column;
   align-items: center;

   &__header {
      width: 100%;
      text-align: center;

      @media (max-width: 767px) {
         h2 {
            font-size: calc(var(--font-size) * 2.5);
         }
      }
   }

   &__videos {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 2rem;
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
