<template>
   <figure class="panel__image h-fit rounded-xl overflow-hidden 
            has-[img]:aspect-square
            has-[img]:col-[9_/_span_7]
            has-[img]:row-start-1 gap-8
            [.tabla_&]:col-[11/-1] [.tabla_&]:row-start-1 [.tabla_&]:w-full
            [.columnas_&]:col-[1/-1] [.columnas_&]:row-start-2 [.columnas_&]:p-0 [.columnas_&]:h-full
            [.columnas_&]:lg:col-[6/12] [.columnas_&]:lg:row-start-1 [.columnas_&]:lg:px-16 [.columnas_&]:aspect-[3/2] [.columnas_&]:lg:aspect-[2/3] [.columnas_&]:rounded-none
            [#precio_&]:col-[2/-2] [#precio_&]:mb-8 [#precio_&]:lg:col-start-9 [#precio_&]:lg:mb-0
            [#paciente\_ideal_&]:has-[img]:col-[2/-2] [#paciente\_ideal_&]:has-[img]:lg:col-[2/_span_7]
            [#caso-real_&]:col-[2/-2] [#caso-real_&]:lg:col-[9/-2] [#caso-real_&]:mb-8 [#caso-real_&]:lg:mb-0
            [#resultados_&]:col-[2/-2] [#resultados_&]:lg:col-[9/-2] [#resultados_&]:mb-8 [#resultados_&]:lg:mb-0"
      v-if="contentData.fondo != 'sin'">
      <div v-if="contentData.fondo == 'vHorizontal'" class="video__player aspect-video">
         <div class="size-full">
            <UiVideo :videoId="contentData.video" />
         </div>
      </div>
      <div v-else-if="contentData.fondo == 'vVertical'"
         class="video__player max-w-full flex flex-col lg:flex-row gap-4 h-fit">
         <div class="size-full lg:max-w-[60%] aspect-[9/16]" v-for="(videoItem, index) in contentData.videos"
            :key="index">
            <UiVideo :videoId="videoItem.video" />
         </div>
      </div>
      <img class="[.columnas_&]:rounded-none [.is-desktop_.columnas_&]:xl:rounded-xl size-full object-cover object-center" loading="lazy"
         v-else-if="contentData.fondo == 'imagen'" 
         :src="contentData.side_image.url"
         :srcset="contentData.side_image.srcset"
         :width="contentData.side_image.width"
         :height="contentData.side_image.height"
         :alt="contentData.side_image.alt" />
   </figure>

   <div class="panel__content [.estetica_&:text-vermell"
      v-if="contentData && contentData.opciones_listado != 'columnas' && contentData.opciones_listado != 'antesdespues'">
      <h2 class="text-clamp-xl 2xl:text-clamp-2xl mb-8 [&>svg]:hidden [#riesgos_&>svg]:block [#riesgos_&]:flex [#riesgos_&]:justify-between [#riesgos_&]:items-center [.estetica:not(.blackfriday)_&]:text-vermell">
         {{ contentData.heading }}
         <svg data-v-620efb82="" class="w-6 aspect-square bg-white box-content p-4 rounded-full stroke-blue-1 stroke-1 transition-all duration-300 ease-in-out origin-center" viewbox="0 0 24 24"><path class="iconV" d="M 12,0 V 24"></path><path class="iconH" d="M 0,12 H 24"></path></svg>
      </h2>
      <div class="answer p-0">
         <div class="answer__content [&>h3]:text-clamp-xl [.estetica:not(.blackfriday)_&]:text-vermell" v-html="contentData.content"></div>
      </div>
      <div v-if="contentData.opciones_listado == 'pestanyes'">
         <CirugiasTabs :contentData="contentData" />
      </div>
   </div>
   <div class="answer__destacado flex flex-col lg:flex-row justify-between items-center gap-8 col-[2/-2]"
      v-if="contentData.opciones_listado === 'tabla' && contentData.texto_destacado">
      <div class="answer__content p-8 [html:not(.estetica)_&]:bg-blue-2 [.estetica:not(.blackfriday)_&]:text-vermell [.estetica:not(.blackfriday)_&]:bg-transparent [.estetica:not(.blackfriday)_&]:border [.estetica:not(.blackfriday)_&]:border-orange-1 text-left rounded-lg" v-for="destacado in contentData.texto_destacado"
         :key="destacado.frase_destacada" v-html="destacado.frase_destacada"></div>
   </div>
</template>

<script setup>


// Props
const props = defineProps({
   contentData: {
      type: Object,
      required: true
   }
})

</script>

<style lang="scss" scoped>
.panel__content {
   @apply col-[2/-2] lg:col-[10_/_span_6] row-start-2 lg:row-start-1;

   &:has(.accordion) {
      @apply col-[2_/_span_6];
   }

   #precio & {
      @apply col-start-2 lg:col-end-8 flex flex-col justify-center;
   }

   #caso-real & {
      @apply col-[2/-2] lg:col-[2/_span_6] self-center;
   }

   #opciones & {
      @apply col-[2/-2] lg:col-[5/_span_8] self-center row-start-1;
   }

}
</style>
