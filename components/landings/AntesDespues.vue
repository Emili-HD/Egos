<template>
   <div class="antesdespues col-[1_/_span_16] xl:col-[2_/_span_14] flex flex-col items-center" ref="comparacion">
      <div class="antesdespues__header w-full text-center">
         <h2>{{ data.antes_despues.titulo_antesdespues }}</h2>
         <ElementsDivider />
         <p v-html="data.antes_despues.subtitulo_antesdespues"></p>
      </div>

      <div class="antesdespues__content flex flex-col xl:flex-row justify-between items-start gap-24 w-full">
         <div class="antesdespues__content-images text-center w-full flex flex-row xl:flex-col gap-2 xl:gap-0 flex-wrap" v-for="elem in data.antes_despues.cirugias_relacionadas">
            <h5 class="antesdespues__content-images-title h6 w-full xl:w-auto mt-4 mb-0">{{ elem.cirugia }}</h5>
            <figure class="antes bg-nude8 overflow-hidden min-h-[22lvh] xl:min-h-[33lvh] rounded-xl xl:rounded-bl-none xl:rounded-br-none">
               <img loading="lazy" class="object-cover object-center max-w-[unset] size-full absolute border-b-4 border-b-[var(--nude-1)]" :src="elem.imagen_antes.url" :alt="elem.imagen_antes.alt" />
               <figcaption class="bg-nude1 py-2 px-6 rounded-tl-xl rounded-tr-xl left-1/2 -translate-x-1/2 absolute bottom-0">Antes</figcaption>
            </figure>
            <figure class="despues bg-nude8 overflow-hidden min-h-[22lvh] xl:min-h-[33lvh] rounded-xl xl:rounded-tl-none xlrounded-tr-none">
               <img loading="lazy" class="object-cover object-center max-w-[unset] size-full absolute border-b-4 border-b-[var(--nude-1)]" :src="elem.imagen_despues.url" :alt="elem.imagen_despues.alt" />
               <figcaption class="bg-nude1 py-2 px-6 rounded-tl-xl rounded-tr-xl left-1/2 -translate-x-1/2 absolute bottom-0">Después</figcaption>
            </figure>
         </div>
      </div>

   </div>
</template>

<script setup>
import { ref } from 'vue';

// Estado reactivo
const comparacion = ref(null)

// props
const props = defineProps({
   data: {
      type: Object,
   }
})
</script>

<style lang="scss" scoped>
   .antesdespues {
      &__header {
         @media (max-width: 767px) {
            h2 {
               font-size: calc(var(--font-size) * 2.5);
            }
         }
      }
   }
</style>
