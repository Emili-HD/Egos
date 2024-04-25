<template>
  <header class="header-gradient min-h-[90vh] xl:min-h-screen 
                px-8 xl:px-16 py-6 xl:py-12 mb-0 
                col-[1_/_span_16] xl:col-span-11 
                flex items-end 
                bg-cover bg-center
                before-gradient" 
                :style="`background-image: url(${data.featured_image_data.src});`">
    <div class="header__content">
      <p class="desde !text-nude-8 leading-10 text-2xl [&>span]:span-gradient bg-blue-1/60 backdrop-blur-lg p-8 w-fit rounded-2xl" 
         v-if="data.acf.precio_desde" v-html="data.acf.precio_desde"
      ></p>
      <h1 class="text-nude-8 mb-10 text-clamp-6xl"><u>{{ data.title.rendered }}</u></h1>
      <div class="answer text-nude-8 [&>h2]:!mb-8 [&>h2]:text-2xl [&>p]:text-lg" v-html="data.content.rendered"></div>
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
