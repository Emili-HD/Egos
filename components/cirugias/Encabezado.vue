<template>
  <header class="header-gradient min-h-[80vh] xl:min-h-screen px-8 xl:px-16 py-6 xl:py-12 mb-0 col-[1_/_span_16] xl:col-span-11 flex items-end bg-cover bg-center" :style="`background-image: url(${data.featured_image_data.src});`">
    <div class="header__content">
      <p class="desde" v-html="data.acf.precio_desde"></p>
      <h1 class="nude8"><u>{{ data.title.rendered }}</u></h1>
      <div class="answer nude8" v-html="data.content.rendered"></div>
    </div>
  </header>
  <div class="form__wrapper bg-blue1 p-12 pt-24 col-[1_/_span_16] xl:col-span-5 flex flex-col justify-center items-center">
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
    font-size: calc(var(--font-size) * 1.5);
    line-height: 1.2;
    
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
  .form__wrapper {
    grid-column: 12/-1;
    background-color: var(--blue-1);
    border-radius: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 5.5em;

    @media (max-width: 767px) {
      grid-column: 1/-1;
    }
  }
  .header-gradient::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: .8;
    background: linear-gradient(180deg, rgba(var(--blue-1-rgb), 0) 10%, var(--blue-1) 80%);
    background-blend-mode: multiply;
    mix-blend-mode: multiply;
  }
</style>
