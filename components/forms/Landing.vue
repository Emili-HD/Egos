<template>
    <div id="hubspotLanding" 
          class="form-landing box-content form-after rounded-2xl w-auto max-w-full xl:w-full" v-once>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Props
const props = defineProps({
  portalId: String,
  formId: String
});

onMounted(() => {
    const script = document.createElement("script");
    script.src="https://js.hsforms.net/forms/v2.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    
    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: props.portalId, // Usa el prop portalId
          formId: props.formId, // Usa el prop formId
          target: "#hubspotLanding"
        })
      }
    })
})
</script>
