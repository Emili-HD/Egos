<template>
    <ClientOnly>
        <div v-if="isMapReady" class="size-full">
            <GoogleMap :api-key="apiKey" class="size-full [&>.gmnoprint]:!hidden" ref="mapRef" :center="centerMap"
                :zoom="zoom" :styles="mapStyles">
                <CustomControl position="LEFT_CENTER" class="clinics ">
                    <div class="clinics p-8 flex flex-col-reverse">
                        <!-- Primer bucle: iterar sobre las clínicas -->
                        <ul v-for="location in locations" :key="location.id" class="hidden lg:flex flex-col list-none">
                            <!-- Segundo bucle: iterar sobre las localizaciones dentro de cada clínica -->
                            <li v-for="(localizacion, index) in location.acf.localizaciones" :key="`${location.id}-${index}`" class="mb-1">
                                <button
                                    class="custom-btn m-0 py-1 px-3 font-light text-sm appearance-none cursor-pointer select-none text-nude-8 bg-blue-1 rounded-md"
                                    @click="() => updateMapAndContent(location.id, index)" v-html="localizacion.id"></button>
                            </li>
                        </ul>
                    </div>
                </CustomControl>
                <div
                  v-for="(location, i) in locations" :key="location.id"
                >
                  <!-- Iteramos sobre cada localización de la clínica -->
                  <Marker
                    v-for="(localizacion, index) in location.acf.localizaciones" 
                    :key="`${location.id}-${index}`"
                    :options="{
                        position: { lat: localizacion.lat, lng: localizacion.lng },
                        anchorPoint: 'BOTTOM_CENTER',
                        icon: markerIcon,
                    }"
                  />
                </div>
            </GoogleMap>
        </div>
    </ClientOnly>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getClinicas } from '@/composables/useApi'

import { GoogleMap, Marker, CustomControl } from 'vue3-google-map'

const { googleMaps } = useRuntimeConfig().public;
const apiKey = googleMaps.apiKey;


// Definir props
const props = defineProps({
    related: {
        type: Array,
        default: () => null
    },
    lat: {
        type: Number,
        default: null
    },
    lng: {
        type: Number,
        default: null
    },
    zoom: {
        type: Number,
        default: null
    }
})
// console.log('Cirugias relacionadas', props.related);


let markerIcon
import('/images/marker_1.png').then((module) => {
    markerIcon = module.default
})
let imageCenter
import('/images/egos/egos-balmes.jpg').then((module) => {
    imageCenter = module.default
})

// Propiedades reactivas
const mapRef = ref(null)
// const centerMap = ref({ lat: 40.855242, lng: -0.486289 })
// const zoom = ref(7.25)
const emit = defineEmits(['update-content'])

// Valores predeterminados para el centro del mapa y el zoom
const defaultCenter = { lat: 40.855242, lng: -0.486289 }
const defaultZoom = 7.25

// Inicializar `centerMap` y `zoom` usando las props si están definidas, sino usar los valores por defecto
const centerMap = ref({
    lat: props.lat !== null ? props.lat : defaultCenter.lat,
    lng: props.lng !== null ? props.lng : defaultCenter.lng
})

const zoom = ref(props.zoom !== null ? props.zoom : defaultZoom)

// Bandera para cargar el mapa solo cuando esté listo
const isMapReady = ref(false)

onMounted(() => {
  // Simular un retardo en la carga si es necesario, pero ahora se utiliza el `defer` para la carga diferida.
  isMapReady.value = true
})

// Métodos
const updateMapAndContent = (locationId, localizacionIndex) => {
    const location = locations.value.find((loc) => loc.id === locationId)
    if (location) {
        const localizacion = location.acf.localizaciones[localizacionIndex]
        centerMap.value = { lat: localizacion.lat, lng: localizacion.lng }
        zoom.value = 15
        emit('update-content', localizacion.informacion)
    }
}

// Verificar si `props.related` tiene contenido y pasar los IDs si están presentes
const { data: locations, error: locationsError } = await useAsyncData('locations', async () => {
    const response = await getClinicas({
        ids: props.related && props.related.length > 0 ? props.related : null
    });
    return response.filter(
        clinica => clinica.acf && !clinica.acf.destacar_post && !clinica.acf.destacar_post.includes('Destacado')
    );
});

// console.log('Datos localizaciones:', locations.value);


// Diseño del mapa
const mapStyles = [
    {
        featureType: 'all',
        elementType: 'geometry',
        stylers: [
            {
                color: '#c1b695',
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
            {
                gamma: 0.01,
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                saturation: -31,
            },
            {
                lightness: -33,
            },
            {
                weight: 2,
            },
            {
                gamma: 0.8,
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'administrative.land_parcel',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ec0000',
            },
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            {
                lightness: 30,
            },
            {
                saturation: 30,
            },
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'on',
            },
            {
                color: '#b6a985',
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'landscape.natural.landcover',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'landscape.natural.terrain',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                saturation: 20,
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#d5c79a',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'poi.attraction',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'poi.attraction',
        elementType: 'geometry.stroke',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'poi.business',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'poi.government',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'poi.government',
        elementType: 'geometry.stroke',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                lightness: 20,
            },
            {
                saturation: -20,
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'on',
            },
            {
                color: '#d5c79a',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry.stroke',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'poi.sports_complex',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
            {
                lightness: 10,
            },
            {
                saturation: -30,
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [
            {
                saturation: 25,
            },
            {
                lightness: 25,
            },
        ],
    },
    {
        featureType: 'road.highway.controlled_access',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
            {
                color: '#c2b795',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#2c2b2b',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                weight: '2.23',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'labels.icon',
        stylers: [
            {
                weight: '1.51',
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#c2b795',
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'geometry.stroke',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'simplified',
            },
            {
                saturation: '3',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'all',
        stylers: [
            {
                color: '#e8e4dd',
            },
        ],
    },
]
</script>

<style lang="scss" scoped>
// empty style
</style>
