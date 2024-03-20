<template>
   <!-- <DelayHydration> -->
   <figure class="
            panel__image 
            h-fit 
            rounded-xl 
            overflow-hidden 
            grid-row-1
            z-2
            has-[img]:aspect-square
            has-[img]:col-[9_/_span_7]
            has-[img]:row-start-1 gap-8" v-if="contentData.fondo != 'sin'">
      <div v-if="contentData.fondo == 'vHorizontal'" class="video__player aspect-video">
         <div class="size-full">
            <VimeoPlayer :videoId="contentData.video" />
         </div>
      </div>
      <div v-else-if="contentData.fondo == 'vVertical'" class="video__player max-w-full flex flex-col lg:flex-row gap-4 h-fit">
         <div class="size-full lg:max-w-[60%] aspect-[9/16]" v-for="(videoItem, index) in contentData.videos" :key="index">
            <VimeoPlayer :videoId="videoItem.video" />
         </div>
      </div>
      <NuxtImg loading="lazy" v-else-if="contentData.fondo == 'imagen'" :src="contentData.side_image.url" alt="" />
   </figure>
   <!-- </DelayHydration> -->
   <div class="panel__content col-[2/-2] lg:col-[10_/_span_6] has-[.accordion]:col-[2_/_span_6] row-start-2 lg:row-start-1"
      v-if="contentData && contentData.opciones_listado != 'columnas' && contentData.opciones_listado != 'antesdespues'">
      <h2 class="text-clamp-2xl mb-8">{{ contentData.heading }}</h2>
      <div class="answer p-0">
         <div class="answer__content" v-html="contentData.content"></div>
      </div>
      <div v-if="contentData.opciones_listado == 'pestanyes'">
         <CirugiasTabs :contentData="contentData" />
      </div>
   </div>
   <div class="answer__destacado" v-if="contentData.opciones_listado === 'tabla' && contentData.texto_destacado">
      <div class="answer__content p-8" v-for="destacado in contentData.texto_destacado" :key="destacado.frase_destacada"
         v-html="destacado.frase_destacada"></div>
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
