<template>
    <div v-if="data.cirugias_en_clinica" class="tratamientos__wrapper px-0 pb-12 xl:pb-24 my-0 col-[2/-2]"
        id="relacionadas" ref="related" data-anchor="relacionadas">
        <div class="tratamientos__services flex flex-col flex-wrap items-center gap-0 lg:gap-4" data-color="#ffffff">
            <div class="cards__title mb-12 col-[2/-2]">
                <h2 v-if="data.cirugias_en_clinica.title_categories" class="h4 lg:text-center">{{ data.cirugias_en_clinica.title_categories }}</h2>
                <div v-if="data.cirugias_en_clinica.descripcion_cirugias" class="lg:[&>p]:!text-center" v-html="data.cirugias_en_clinica.descripcion_cirugias"></div>
            </div>
            <div class="tratamientos__relacionados flex flex-row flex-wrap justify-start gap-4 w-full">
                <div class="card__wrapper w-full max-w-[100vw] sm:max-w-[calc(50%-.5rem)] lg:max-w-[33vw] xl:max-w-[calc(100%/4-.75rem)]"
                    v-for="cirugia in data.cirugias_en_clinica.cirugias" :key="cirugia">
                    <ClinicasCards :data="cirugia" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        data: {
            type: Object,
            required: true
        },
    });

    // Estado reactivo para los datos relacionados
    const related = ref(null);
</script>
