<template>
    <section class="bg-nude-7 py-12 xl:py-20 grid grid-cols-12 gap-4">
        <div class="col-start-2 col-span-5">
            <h2>{{ titulo }}</h2>
            <div v-html="texto"></div>
        </div>
        <div class="links-clinicas col-start-8 col-span-4 flex flex-wrap gap-3">
            <UiButton v-for="clinica in data" :key="clinica.ID" :to="formatPermalink(clinica.permalink)" class="gold-light max-sm:text-xs min-w-[calc(50%-1rem)]">{{ clinica.post_excerpt }}</UiButton>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    titulo: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    data: {
        type: Array,
        required: true
    },
})

// Función que formatea el permalink para devolver la ruta relativa
const formatPermalink = (permalink) => {
    return permalink.replace('https://clinicaegos.com', '')
}
</script>
