<template>
   <figure class="panel__image h-fit rounded-xl overflow-hidden grid-row-1z-2
            has-[img]:aspect-square
            has-[img]:col-[9_/_span_7]
            has-[img]:row-start-1 gap-8
            [.tabla_&]:col-[11/-1] [.tabla_&]:row-start-1 [.tabla_&]:w-full
            [.columnas_&]:col-[1/-1] [.columnas_&]:row-start-2 [.columnas_&]:p-0 [.columnas_&]:h-full
            [.columnas_&]:lg:col-[6/12] [.columnas_&]:lg:row-start-1 [.columnas_&]:lg:px-16 [.columnas_&]:aspect-[3/2] [.columnas_&]:lg:aspect-[2/3] [.columnas_&]:rounded-none
            [#precio_&]:col-[2/-2] [#precio_&]:mb-8 [#precio_&]:lg:col-start-9 [#precio_&]:lg:mb-0
            [#paciente\_ideal_&]:has-[img]:col-[2/-2] [#paciente\_ideal_&]:has-[img]:lg:col-[2/_span_7]
            [#caso-real_&]:col-[2/-2] [#caso-real_&]:lg:col-[9/-2] [#caso-real_&]:mb-8 [#caso-real_&]:lg:mb-0"
      v-if="contentData.fondo != 'sin'">
      <div v-if="contentData.fondo == 'vHorizontal'" class="video__player aspect-video">
         <div class="size-full">
            <VimeoPlayer :videoId="contentData.video" />
         </div>
      </div>
      <div v-else-if="contentData.fondo == 'vVertical'"
         class="video__player max-w-full flex flex-col lg:flex-row gap-4 h-fit">
         <div class="size-full lg:max-w-[60%] aspect-[9/16]" v-for="(videoItem, index) in contentData.videos"
            :key="index">
            <VimeoPlayer :videoId="videoItem.video" />
         </div>
      </div>
      <img class="rounded-xl [.columnas_&]:rounded-none size-full object-cover object-center" loading="lazy"
         v-else-if="contentData.fondo == 'imagen'" 
         :src="contentData.side_image.url"
         :srcset="contentData.side_image.srcset"
         :width="contentData.side_image.width"
         :height="contentData.side_image.height"
         :alt="contentData.side_image.alt" />
   </figure>

   <div
      class="panel__content col-[2/-2] lg:col-[10_/_span_6] has-[.accordion]:col-[2_/_span_6] row-start-2 lg:row-start-1 [#precio_&]:col-start-2 
               [#precio_&]:lg:col-end-8 [#precio_&]:flex [#precio_&]:flex-col [#precio_&]:justify-center [#caso-real_&]:col-[2/-2] [#caso-real_&]:lg:col-[2/_span_6] [#caso-real_&]:self-center"
      v-if="contentData && contentData.opciones_listado != 'columnas' && contentData.opciones_listado != 'antesdespues'">
      <h2 class="text-clamp-2xl mb-8">{{ contentData.heading }}</h2>
      <div class="answer p-0">
         <div class="answer__content" v-html="contentData.content"></div>
      </div>
      <div v-if="contentData.opciones_listado == 'pestanyes'">
         <CirugiasTabs :contentData="contentData" />
      </div>
   </div>
   <div class="answer__destacado flex flex-col lg:flex-row justify-between items-center gap-8 col-[2/-2]"
      v-if="contentData.opciones_listado === 'tabla' && contentData.texto_destacado">
      <div class="answer__content p-8 bg-blue-2 text-left rounded-lg" v-for="destacado in contentData.texto_destacado"
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

<style lang="scss" scoped></style>
