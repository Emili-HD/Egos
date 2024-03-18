<template>
    <div :id="identificador" 
          class="form-landing box-content
          after:content-[''] 
          after:border after:border-solid after:border-nude-8/[0.1] after:bg-nude-8/[0.025]
          after:absolute after:-top-6 after:-left-6 after:rounded-2xl
          after:w-[calc(100%+3rem)] after:h-[calc(100%+3rem)] after:pointer-events-none
          rounded-2xl w-auto max-w-full" v-once>
          </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Props
const props = defineProps({
  portalId: String,
  formId: String,
  identificador: String,
});

onMounted(() => {
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
      }
    })
})
</script>

<style lang="scss">

.form-landing {
  position: relative;
}
</style>

