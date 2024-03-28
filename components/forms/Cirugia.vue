<template>
    <div :id="identificador" 
          class="form-landing box-content form-after rounded-2xl w-auto max-w-full"  v-once >
    </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'

const isHubSpotLoaded = ref(false)

// Props
const props = defineProps({
  portalId: String,
  formId: String,
  identificador: String,
});

onMounted( async () => {
  const script = document.createElement("script");
  script.src="https://js.hsforms.net/forms/v2.js";
  document.body.appendChild(script);
  
  script.addEventListener("load", () => {
    if (window.hbspt) {
      window.hbspt.forms.create({
        portalId: props.portalId, // Usa el prop portalId
        formId: props.formId, // Usa el prop formId
        target: '#' + props.identificador
      })
      isHubSpotLoaded.value = true;
      // console.log('form iniciado');
    }
  })
})
</script>


<style lang="scss" scoped>
/* empty style */
</style>

