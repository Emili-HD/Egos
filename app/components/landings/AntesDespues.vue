<template>
   <div class="antesdespues col-[2_/_span_14] xl:col-[2_/_span_14] flex flex-col items-center py-4 xl:py-20" ref="comparacion">
      <div class="antesdespues__header w-full text-center p-0">
         <h2 class="text-clamp-4xl text-balance">{{ data.antes_despues.titulo_antesdespues }}</h2>
         <ElementsDivider />
         <p v-html="data.antes_despues.subtitulo_antesdespues"></p>
      </div>

      <div class="antesdespues__content flex flex-row flex-wrap justify-center items-start gap-4 xl:gap-12 w-full p-0 xl:has-[.vertical]:flex-wrap">
         <div class="antesdespues__content-images text-center flex flex-row xl:flex-col xl:has-[.vertical]:flex-row gap-0 flex-wrap w-full md:w-[calc(50%-.5rem)] xl:w-[30%]"
            v-for="elem in data.antes_despues.cirugias_relacionadas">
            <h5 class="antesdespues__content-images-title w-full my-4 min-h-[2.5em] text-clamp-lg flex flex-col justify-center">{{ elem.cirugia }}</h5>
            <figure
               class="antes aspect-[3/2] [&.vertical]:aspect-[2/3]" :class="elem.orientacion" v-if="elem.orientacion === 'vertical' || elem.orientacion === 'horizontal'">
               <img loading="lazy"
                  v-if="elem.imagen_antes && elem.imagen_antes.url"
                  class="object-cover object-center max-w-[unset] size-full absolute border-b-4 border-b-nude-1"
                  :src="elem.imagen_antes.url" 
                  :srcset="elem.imagen_antes.srcset" 
                  :alt="elem.imagen_antes.alt" 
                  :width="elem.imagen_antes.width" 
                  :height="elem.imagen_antes.height" 
               />
               <figcaption
                  class="bg-nude-1 py-2 px-6 rounded-tl-xl rounded-tr-xl left-1/2 -translate-x-1/2 absolute bottom-0">
                  Antes</figcaption>
            </figure>
            <figure
               class="despues aspect-[3/2] [&.vertical]:aspect-[2/3]" :class="elem.orientacion" v-if="elem.orientacion === 'vertical' || elem.orientacion === 'horizontal'">
               <img loading="lazy"
                  v-if="elem.imagen_despues && elem.imagen_despues.url"
                  class="object-cover object-center max-w-[unset] size-full absolute border-b-4 border-b-nude-1"
                  :src="elem.imagen_despues.url" 
                  :srcset="elem.imagen_despues.srcset" 
                  :alt="elem.imagen_despues.alt" 
                  :width="elem.imagen_despues.width" 
                  :height="elem.imagen_despues.height" 
               />
               <figcaption
                  class="bg-nude-1 py-2 px-6 rounded-tl-xl rounded-tr-xl left-1/2 -translate-x-1/2 absolute bottom-0">
                  Después</figcaption>
            </figure>

            <figure class="size-full aspect-[9/16] min-h-[550px]" :class="elem.orientacion" v-if="elem.orientacion === 'video'">
               <UiVideo :videoId="elem.video_url" />
               <!-- <figcaption>Exhibit B. The <cite>Rough Copy</cite> trailer.</figcaption> -->
            </figure>
         </div>
      </div>

   </div>
</template>

<script setup>
import { ref } from 'vue';


const comparacion = ref(null)

// props
const props = defineProps({
   data: {
      type: Object,
   }
})
</script>

<style scoped>
:global(.antesdespues.panel) {
   @apply bg-nude-7 [.estetica_&]:bg-crema;
}
.antesdespues {
   &__header {
      @media (min-width: 2767px) {
         h2 {
            font-size: 3rem;
         }
      }
   }
}

.antesdespues__content-images {
   @apply xl:has-[.horizontal]:max-w-[22vw];
}

figure {

   &.horizontal {
      @apply bg-nude-6 overflow-hidden w-full;
      &.antes {
         @apply rounded-tl-xl rounded-tr-xl;
      }
      &.despues {
         @apply rounded-bl-xl rounded-br-xl;
      }
   }
   &.vertical {
      @apply bg-nude-6 overflow-hidden w-full lg:w-1/2;
      &.antes {
         @apply max-lg:rounded-tl-xl max-lg:rounded-tr-xl lg:rounded-tl-xl lg:rounded-bl-xl lg:border-r-4 border-nude-1;
      }
      &.despues {
         @apply max-lg:rounded-bl-xl max-lg:rounded-br-xl lg:rounded-tr-xl lg:rounded-br-xl;
      }
   }
}

</style>
