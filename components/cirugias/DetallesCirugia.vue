<template>
    <div class="detalles bg-blue-1 col-[1_/_span_16] mb-6 sm:mb-16 p-6 flex flex-row flex-wrap justify-between xl:justify-center items-stretch xl:items-center gap-4"
        v-if="detallesData">
        <div class="detalles__intervencion bg-blue-2 rounded-xl p-4 w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%/3)-0.75rem)] xl:w-[12.5%] flex flex-col [.columnas_&]:lg:flex-row justify-center items-center gap-2 [.columnas_&]:flex-row [.columnas_&]:bg-gold-3/50 [.columnas_&]:even:bg-blue-1/50 [.columnas_&]:w-full xl:[.columnas_&]:w-60 [&_p]:text-nude-4 [&_p]:mb-0 [&_p]:flex [&_p]:flex-col [&_strong]:font-semibold [&_p]:text-base"
            v-for="detalles in detallesData" :key="detalles.texto_detalles">
            <img src="/assets/images/icons/ok.svg" alt="" width="27" height="27" />
            <div v-html="detalles.texto_detalles"></div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    detallesData: {
        type: Object,
        required: true,
    },
})
</script>
