<template>
    <div v-if="treatmentsData.cirugias_relacionadas" class="tratamientos__wrapper px-0 pb-12 xl:pb-24 my-0"
        id="relacionadas" ref="related" data-anchor="relacionadas">
        <div class="tratamientos__services flex flex-col flex-wrap items-center gap-0 lg:gap-4" data-color="#ffffff">
            <div class="cards__title mb-12 col-[2/-2]">
                <h2 v-if="treatmentsData.titulo_cirugias_relacionadas" class="h4 lg:text-center">{{ treatmentsData.titulo_cirugias_relacionadas }}</h2>
                <div v-if="treatmentsData.texto_cirugias_relacionadas" class="lg:[&>p]:!text-center" v-html="treatmentsData.texto_cirugias_relacionadas"></div>
            </div>
            <div class="tratamientos__relacionados flex flex-row flex-wrap justify-center gap-4 w-full">
                <div class="card__wrapper w-full max-w-[100vw] sm:max-w-[calc(50%-.5rem)] lg:max-w-[33vw] xl:max-w-[calc(100%/3-.75rem)]"
                    v-for="categoryId in treatmentsData.cirugias_relacionadas" :key="categoryId">
                    <DoctorCards :categoryId="categoryId" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';


// Definir props
const props = defineProps({
    treatmentsData: {
        type: Object,
        required: true
    },
});

// Estado reactivo para los datos relacionados
const related = ref(null);

</script>
