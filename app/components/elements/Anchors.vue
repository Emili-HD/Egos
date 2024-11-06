<template>
    <div class="anchors-cirugia relative">
        <div class="anchor" v-for="item in data" :key="item.ancla">
            <a :href="`#${processAncla(item.ancla)}`">{{ item.ancla }}</a>
        </div>
        <div class="anchor">
            <a href="#faqs">Preguntas frecuentes</a>
        </div>
        <div class="anchor">
            <a href="#presupuesto">Calcula tu presupuesto</a>
        </div>
        <div class="anchor">
            <a href="#relacionadas">Tratamientos relacionados</a>
        </div>
        <div class="anchor">
            <a href="#doctores">Doctores</a>
        </div>
        <div class="anchor">
            <a href="#premios">Reconocimientos</a>
        </div>
        <div class="anchor">
            <a href="#opiniones">Opiniones</a>
        </div>
        <div class="anchor">
            <a href="#posts">Posts</a>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})

const processAncla = (ancla) => {
    // Convertir a minúsculas
    let processed = ancla.toLowerCase()

    // Reemplazar acentos y caracteres especiales
    processed = processed.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    // Reemplazar espacios con guiones bajos
    processed = processed.replace(/\s+/g, '_')

    return processed
}
</script>

<style lang="scss" scoped>
.anchors-cirugia {
    @apply p-6 xl:p-8 flex flex-wrap gap-2 xl:gap-4;

    .anchor {
        @apply uppercase w-full sm:w-[calc(50%-.5rem)] lg:w-[calc(33.333%-.5rem)] xl:w-[calc(25%-1rem)] 2xl:w-[calc(20%-1rem)] bg-blue-1/5 px-4 py-2 border-l-8 border-blue-1 text-clamp-xs;
    }
}

.tratamiento-113 .anchors-cirugia {
    .anchor {
        @apply uppercase w-full sm:w-[calc(50%-.5rem)] lg:w-[calc(33.333%-.5rem)] xl:w-[calc(25%-1rem)] 2xl:w-[calc(20%-1rem)] bg-vermell/5 px-4 py-2 border-l-8 border-vermell text-clamp-xs;
    }
}
</style>
