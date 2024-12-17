<template>
    <div :id="identificador" class="form-landing box-content form-after rounded-2xl w-auto max-w-full" v-once></div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'

    const isHubSpotLoaded = ref(false)

    // Props
    const props = defineProps({
        portalId: String,
        formId: String,
        identificador: String,
    })    

    onMounted(() => {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(loadHubSpotForm)
        } else {
            loadHubSpotForm()
        }
    })

    const loadHubSpotForm = () => {
        const script = document.createElement('script')
        script.src = 'https://js.hsforms.net/forms/v2.js'
        script.defer = true
        document.body.appendChild(script)

        script.onload = () => {
            if (window.hbspt) {
                window.hbspt.forms.create({
                    portalId: props.portalId, // Usa el prop portalId
                    formId: props.formId, // Usa el prop formId
                    target: '#' + props.identificador,
                })
                isHubSpotLoaded.value = true // Marca que HubSpot se cargó correctamente
            }
        }
    }
</script>

<style lang="scss" scoped>
    // empty style
</style>
