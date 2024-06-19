<template>
  <header class="header-gradient min-h-[90vh] xl:min-h-screen 
                px-8 xl:px-16 pt-[40vh] pb-6 xl:py-12 mb-0 
                col-[1_/_span_16] xl:col-span-11 
                flex items-end 
                bg-cover bg-center
                before-gradient" 
                :style="`background-image: url(${data.featured_image_data.src});`">
    <div class="header__content">
      <div v-if="data.acf.rebaja">
        <h1 class="text-nude-8 mb-10 text-clamp-6xl"><u>{{ data.title.rendered }}</u></h1>
        <div class="answer text-nude-8 [&>h2]:!mb-8 [&>h2]:text-2xl [&>p]:text-lg" v-html="data.content.rendered"></div>
        <div class="flex gap-2 bg-blue-1/60 backdrop-blur-lg p-8 w-fit rounded-2xl m-0">
          <div class="desde leading-10 span-gradient !text-clamp-2xl drop-shadow lowercase font-normal mb-0 [&>span]:line-through inline [&>span]:text-red-600 [&>span]:opacity-50" 
            v-if="data.acf.precio_desde" 
            v-html="data.acf.precio_desde"
          ></div>
          <div class="desde leading-10 span-gradient !text-clamp-2xl drop-shadow lowercase font-normal mb-0 [&>span]:line-through inline" 
            v-if="data.acf.rebaja" 
            v-html="data.acf.rebaja"
          ></div>
        </div>
        <ElementsCountDown class="x2 max-w-lg m-0" :data="data.acf" />
      </div>
      <div v-else>
        <p class="desde !text-nude-8 leading-10 text-2xl [&>span]:span-gradient bg-blue-1/60 backdrop-blur-lg p-8 w-fit rounded-2xl" 
           v-if="data.acf.precio_desde" v-html="data.acf.precio_desde"
        ></p>
        <h1 class="text-nude-8 mb-10 text-clamp-6xl"><u>{{ data.title.rendered }}</u></h1>
        <div class="answer text-nude-8 [&>h2]:!mb-8 [&>h2]:text-2xl [&>p]:text-lg" v-html="data.content.rendered"></div>
      </div>
    </div>
  </header>
  <div class="form__wrapper bg-blue-1 p-12 pt-24 col-[1_/_span_16] xl:col-span-5 flex flex-col justify-center items-stretch">
    <FormsCirugia :identificador="'topPage'" :portalId="String(data.acf.formulario.portalid)" :formId="data.acf.formulario.formid" />
  </div>
</template>

<script setup>

// Props
const props = defineProps({
  data: {
    type: Object
  }
})

</script>

<style lang="scss" scoped>
// estilos vacíos
</style>
