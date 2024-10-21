<template>
  <div class="oferta__group bg-blue-1 rounded-none md:rounded-2xl max-w-screen md:max-w-screen/50 overflow-hidden flex flex-col justify-center">
    <div class="oferta__img p-24 m-0 text-nude-8 bg-cover bg-center flex flex-col justify-center items-center [text-shadow:_0px_4px_6.9px_#1C2C44]
         [&_h2]:font-semibold [&_h2]:mb-0 [&_h3]:font-semibold [&_h3]:mb-0 [&_p]:text-clamp-base [&_p]:font-normal [&_p]:mb-0" 
         :style="`background-image: url(${data.formimg})`">
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
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadHubSpotForm);
  } else {
    loadHubSpotForm();
  }
});

function loadHubSpotForm() {
  const script = document.createElement("script");
  script.src = "https://js.hsforms.net/forms/v2.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  script.onload = () => {
    if (window.hbspt) {
      window.hbspt.forms.create({
        portalId: props.portalId, // Usa el prop portalId
        formId: props.formId, // Usa el prop formId
        target: "#ofertaForm"
      })
    }
  };
}

</script>

<style lang="scss">
.oferta {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  
}
</style>

