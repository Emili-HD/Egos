<template>
  <div v-if="data && data.quiz && data.quiz.formid"  id="presupuesto" class="form__wrapper p-8 xl:p-20 col-[1/-1] xl:col-[1/9] bg-blue-1 flex flex-col justify-center items-stretch min-h-screen/80">
    <FormsQuiz :identificador="'formPage'" :portalId="String(data.quiz.portalid)" :formId="data.quiz.formid" :titulo="data.quiz.titulo_form" />
  </div>
  <div v-else id="formulario" class="form__wrapper p-8 xl:p-36 col-[1/-1] xl:col-[1/9] bg-blue-1 flex flex-col justify-center items-stretch min-h-screen/80">
    <FormsCustomForm :identificador="'formPage'" :portalId="String(data.formulario.portalid)" :formId="data.formulario.formid" />
  </div>
  <div class="form__image col-[1/-1] xl:col-[9/-1] bg-cover h-[50vh] xl:h-auto" :style="`background-image: url(${data.formulario.form_image.url});`"></div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
// Props
const props = defineProps({
  data: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>
// empty style
</style>
