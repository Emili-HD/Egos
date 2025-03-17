<template>
    <section v-if="treatmentsData.cirugias_relacionadas" class="tratamientos__wrapper p-12 px-8 xl:pb-24 my-0"
        id="relacionadas" ref="related" data-anchor="relacionadas">
        <div class="tratamientos__services flex flex-col flex-wrap items-center gap-0 lg:gap-4" data-color="#ffffff">
            <div class="cards__title mb-12 col-[2/-2]">
                <h2 class="h4 lg:text-center">{{ treatmentsData.titulo_relacionados }}</h2>
            </div>
            <div class="tratamientos__relacionados flex flex-row flex-wrap justify-center gap-4 w-full">
                <div class="card__wrapper w-full max-w-[100vw] sm:max-w-[calc(50%-.5rem)] lg:max-w-[40vw] xl:max-w-[20vw]"
                    v-for="categoryId in treatmentsData.cirugias_relacionadas" :key="categoryId">
                    <CirugiasCategorySlide :categoryId="categoryId" />
                </div>
            </div>
        </div>
    </section>
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

// console.log('cirugias: ', props.treatmentsData.cirugias_relacionadas);


// Estado reactivo para los datos relacionados
const related = ref(null);

</script>
