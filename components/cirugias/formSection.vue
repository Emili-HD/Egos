<template>
  <div id="formulario" class="form__wrapper p-8 xl:p-36">
    <FormsCirugia :identificador="'formPage'" :portalId="String(data.formulario.portalid)"
      :formId="data.formulario.formid" />
  </div>
  <div class="form__image" :style="`background-image: url(${data.formulario.form_image.url});`"></div>
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
.form__image {
  grid-column: 10/-1;
  background-size: cover;

  @media (max-width: 767px) {
    grid-column: 1/-1;
    height: 50vh;
  }
}

.form__wrapper {
  grid-column: 1/10;
  background-color: var(--blue-1);
  border-radius: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // padding-top: 5.5rem;

  @media (max-width: 767px) {
    grid-column: 1/-1;
  }
}
</style>
