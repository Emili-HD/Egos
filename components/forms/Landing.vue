<template>
    <div id="hubspotLanding" class="form-landing px-12 py-8" v-once></div>
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

<style lang="scss">

.form-landing {
    -webkit-backdrop-filter: blur(0.5rem);
    backdrop-filter: blur(0.5rem);
    background: linear-gradient(121deg, rgba(var(--nude-8-rgb), 0.04) 5.96%, rgba(var(--nude-8-rgb), 0.01) 68.72%);
    border-radius: var(--radius-m);
    border: 1px solid rgba(var(--nude-8-rgb), 0.12);
    // box-shadow: 0px 1px 4px 0px rgba(var(--blue-6-rgb), 0.27), 0px 4px 5px 0px rgba(var(--nude-8-rgb), 0.16) inset;
}
</style>

