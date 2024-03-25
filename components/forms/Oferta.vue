<template>
  <div class="oferta__group">
    <div class="oferta__img p-24 m-0" :style="`background-image: url(${data.formimg})`">
      <div v-if="data.texto_form" v-html="data.texto_form"></div>
    </div>
    <div id="ofertaForm" class="oferta__form py-12 px-12 m-0" v-once v-resize></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Props
const props = defineProps({
  portalId: String,
  formId: String,
  data: Object
});

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://js.hsforms.net/forms/v2.js";
  document.body.appendChild(script);

  script.addEventListener("load", () => {
    if (window.hbspt) {
      window.hbspt.forms.create({
        portalId: props.portalId, // Usa el prop portalId
        formId: props.formId, // Usa el prop formId
        target: "#ofertaForm"
      })
    }
  })
})
</script>

<style lang="scss">
.oferta {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__group {
    background-color: var(--blue-1);
    border-radius: var(--radius-m);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 50vw;

    @media (max-width: 767px) {
      max-width: 100vw;
      border-radius: 0;
    }
  }

  &__img {
    color: var(--nude-8);
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-shadow: 0px 4px 6.9px #1C2C44;

    @media (max-width: 767px) {
      padding: 5rem 0;
    }

    h2,
    h3 {
      font-weight: 600;
      margin-bottom: 0;
    }

    p {
      font-size: calc(var(--font-size) * 1.25);
      font-weight: 400;
      margin-bottom: 0;
    }
  }

  // #ofertaForm {
  //   iframe {
  //     height: 350px !important;
  //   }
  // }
}
</style>

