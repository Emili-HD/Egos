<template>
    <div id="hubspotLanding"
        class="form-landing box-content form-after rounded-2xl m-auto w-auto max-w-full lg:w-[max(400px,40vw)] xl:w-[max(400px,35vw)] [&_h2]:text-balance [&_h2]:text-center [&_h2]:text-clamp-2xl [&_ul]:list-none"
        v-once>
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
