<template>
    <section class="bg-nude-7 py-12 xl:py-20 grid grid-cols-12 gap-4">
        <div class="col-[2/-2] lg:col-start-2 lg:col-span-5">
            <h2>{{ titulo }}</h2>
            <div v-html="texto"></div>
        </div>
        <div class="links-clinicas col-[2/-2] lg:col-start-8 lg:col-span-4 flex flex-wrap max-lg:justify-between gap-1">
            <UiButton v-for="clinica in data" :key="clinica.ID" :to="formatPermalink(clinica.permalink)" class="gold-light max-sm:text-xs sm:text-sm max-lg:!px-4 max-lg:!w-[calc(50%-0.2rem)] lg:min-w-[calc(50%-1rem)]">{{ clinica.post_excerpt }}</UiButton>
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
