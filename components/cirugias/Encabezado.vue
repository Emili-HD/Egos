<template>
  <header class="header-gradient min-h-[80vh] xl:min-h-screen 
                px-8 xl:px-16 py-6 xl:py-12 mb-0 
                col-[1_/_span_16] xl:col-span-11 
                flex items-end 
                bg-cover bg-center
                before:content-[''] before:size-full before:absolute
                before:left-0 before:top-0 before:opacity-80 before:mix-blend-multiply
                before:bg-gradient-to-b from-transparent from-[10%] to-[#1c2c44]" 
                :style="`background-image: url(${data.featured_image_data.src});`">
    <div class="header__content">
      <p class="desde leading-10 !text-white text-2xl
               [&>span]:!blog" 
      v-html="data.acf.precio_desde"></p>
      <h1 class="nude8"><u>{{ data.title.rendered }}</u></h1>
      <div class="answer nude8" v-html="data.content.rendered"></div>
    </div>
  </header>
  <div class="form__wrapper bg-blue1 p-12 pt-24 col-[1_/_span_16] xl:col-span-5 flex flex-col justify-center items-stretch">
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
  :deep(.desde) {    
    span {
      display: block;
      background: var(--gradient-gold);
      background-size: 10%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: calc(var(--font-size) * 2.5);
      font-weight: 600;

      @media (max-width: 767px) {
        background-size: 60%;
      } 
    }
  }
</style>
