<template>
    <section
        class="pidecita w-screen col-span-full grid grid-cols-16 grid-rows-2 lg:grid-rows-1 min-h-screen py-0 lg:gap-0">
        <div class="col-span-full lg:col-span-11 min-h-screen/60">
            <LazyElementsGoogleMap 
                @update-content="handleContentUpdate" 
                @update-options="handleOptionsUpdate" 
                :related="related" :lat="lat" :lng="lng" :zoom="zoom" />
        </div>
        <div id="formulario" class="half-right">
            <div class="map-info mb-12 [&>*]:!text-blue-1 [&>ul>li]:!text-blue-1 [&>ul>li]:list-none [&>ul]:border-t [&>ul]:border-blue-1/50 [&>ul]:pt-2 [&>*]:mb-2 [&>ul>li]:mb-0" v-html="content"></div>
            <div class="form__wrapper">
                <!-- <FormsCirugia :identificador="'map'" :portalId="portalId" :formId="formId" /> -->
                <FormsCustomForm :identificador="'map'" :portalId="String(portalId)" :formId="formId" />
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

<style lang="scss" scoped>
.half-right {
    @apply bg-blue-1 p-6 xl:p-12 h-fit lg:h-full w-full mb-0 top-0 flex flex-col justify-center col-span-full lg:col-[12/17] row-start-2 lg:row-start-1 lg:min-h-screen;

    .form__wrapper {
        @apply p-0 mb-12 lg:p-12 xl:p-0;
    }
}

.map-info {
    @apply absolute -translate-x-[120%] bg-white/25 backdrop-blur-lg p-8 rounded-xl bottom-0;
    &:empty {
        @apply opacity-0;
    }
}
</style>
