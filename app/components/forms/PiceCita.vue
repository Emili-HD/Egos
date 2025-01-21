<template>
    <section
        class="pidecita col-span-full flex flex-col lg:flex-row justify-between items-stretch">
        <div class="w-full lg:w-2/3 min-h-[600px]">
            <!-- <LazyElementsGoogleMap
                @update-content="handleContentUpdate" 
                @update-options="handleOptionsUpdate" 
                :related="related" 
                :lat="lat" 
                :lng="lng" 
                :zoom="zoom" 
            /> -->
            <ElementsMaps :related="related"/>
        </div>
        <div id="formulario" class="half-right [.blackfriday_&]:!bg-blackfriday w-full lg:w-1/3">
            <div class="map-info mb-12 [&>*]:!text-blue-1 [&>ul>li]:!text-blue-1 [&>ul>li]:list-none [&>ul]:border-t [&>ul]:border-blue-1/50 [&>ul]:pt-2 [&>*]:mb-2 [&>ul>li]:mb-0" v-html="content"></div>
            <div class="form__wrapper">
                <FormsEsteticaForm v-if="tipo === 'Bloom'" :identificador="'map'" :portalId="String(portalId)"
                    :formId="formId" :name="name"/>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

// Estados reactivos
const content = ref('')
const options = ref('all')

// Props
const props = defineProps({
    titulo: {
        type: String,
        default: 'Pide Cita',
    },
    related: {
        type: Array
    },
    name: String,
    tipo: String,
    portalId: String,
    formId: String,
    identificador: String,
    lat: Number,
    lng: Number,
    zoom: Number
})

// Métodos
const handleContentUpdate = (newContent) => {
    content.value = newContent
}

const handleOptionsUpdate = (newOptions) => {
    options.value = newOptions
}

</script>

<style scoped>
.pidecita {
    width: 100%;
    @media (min-width: 1025px) {
        height: 900px;
    }
    @media (min-width: 1440px) {
        height: 1100px;
    }
    @media (max-width: 1024px) {
        height: 1320px;
    }
    @media (max-width: 768px) {
        height: 1420px;
    }
    @media (max-width: 560px) {
        min-height: 1620px;
    }
}

.half-right {
    @apply bg-blue-1 p-6 xl:p-12 lg:h-full mb-0 top-0 flex flex-col justify-center;

    .blackfriday:not(.estetica) & {
        @apply bg-dark-1;
    }

    .form__wrapper {
        @apply p-0 mb-12 lg:p-12 xl:p-0;
    }
}

.estetica .half-right {
    @apply bg-crema;
}

.map-info {
    @apply absolute -translate-x-[120%] bg-white/25 backdrop-blur-lg p-8 rounded-xl bottom-0;
    &:empty {
        @apply opacity-0;
    }
}
</style>
