<template>
   <div class="antesdespues col-[1_/_span_16] xl:col-[2_/_span_14] flex flex-col items-center" ref="comparacion">
      <div class="antesdespues__header w-full text-center p-0">
         <h2>{{ data.antes_despues.titulo_antesdespues }}</h2>
         <ElementsDivider />
         <p v-html="data.antes_despues.subtitulo_antesdespues"></p>
      </div>

      <div class="antesdespues__content flex flex-col xl:flex-row justify-between items-start gap-24 w-full p-0">
         <div class="antesdespues__content-images text-center w-full flex flex-row xl:flex-col gap-0 flex-wrap"
            v-for="elem in data.antes_despues.cirugias_relacionadas">
            <h5 class="antesdespues__content-images-title w-full xl:w-auto my-4">{{ elem.cirugia }}</h5>
            <figure
               class="antes bg-nude-6 overflow-hidden min-h-[28lvh] rounded-tl-xl rounded-tr-xl w-full">
               <NuxtImg loading="lazy"
                  class="object-cover object-center max-w-[unset] size-full absolute border-b-4 border-b-nude-1"
                  :src="elem.imagen_antes.url" :alt="elem.imagen_antes.alt" />
               <figcaption
                  class="bg-nude-1 py-2 px-6 rounded-tl-xl rounded-tr-xl left-1/2 -translate-x-1/2 absolute bottom-0">
                  Antes</figcaption>
            </figure>
            <figure
               class="despues bg-nude-6 overflow-hidden min-h-[28lvh] rounded-bl-xl rounded-br-xl w-full">
               <NuxtImg loading="lazy"
                  class="object-cover object-center max-w-[unset] size-full absolute border-b-4 border-b-nude-1"
                  :src="elem.imagen_despues.url" :alt="elem.imagen_despues.alt" />
               <figcaption
                  class="bg-nude-1 py-2 px-6 rounded-tl-xl rounded-tr-xl left-1/2 -translate-x-1/2 absolute bottom-0">
                  Después</figcaption>
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
      @media (min-width: 2767px) {
         h2 {
            font-size: 3rem;
         }
      }
   }
}
</style>
