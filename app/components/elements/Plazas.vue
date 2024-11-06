<template>
    <!-- <ClientOnly> -->
        <div v-if="data.numero_plazas > 0"
            class="flex justify-center flex-wrap w-full max-w-sm [html:not(.blackfriday)_&]:bg-blue-1/50 [.blackfriday_&]:bg-black/50 backdrop-blur-lg py-2 rounded-full">
            <p class="w-full mb-1 text-center font-normal text-nude-8 uppercase">
                Quedan {{ data.numero_plazas }} plazas disponibles
            </p>
        </div>
    <!-- </ClientOnly> -->
</template>

<script setup>
// Definimos las props
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

</script>

