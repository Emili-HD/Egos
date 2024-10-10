<template>
    <ClientOnly>
        <div v-if="isMapReady"
            class="clinicas__egos-map size-full rounded-3xl overflow-hidden 
                    [.nuestras-clinicas_&]:grid-rows-2 [.nuestras-clinicas_&]:even:grid-rows-1 [.nuestras-clinicas_&]:col-[2/-2] 
                    lg:[.nuestras-clinicas_&]:col-[2/9] lg:[.nuestras-clinicas_.card:nth-child(even)_&]:col-[11/-2] xl:[.nuestras-clinicas_&]:col-[2/7]">
            <GoogleMap :api-key="apiKey" class="size-full" ref="mapRef" :center="centerMap" :zoom="props.zoom"
                :styles="mapStyles">
                <Marker v-for="(location, i) in locations" :key="i" :options="{
                    position: { lat: location.lat, lng: location.lng },
                    anchorPoint: 'BOTTOM_CENTER',
                    icon: markerIcon,
                }" />
            </GoogleMap>
        </div>
    </ClientOnly>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import {
  GoogleMap,
  Marker,
} from 'vue3-google-map';

// Obtenemos la API key desde la configuración
const { googleMaps } = useRuntimeConfig().public;
const apiKey = googleMaps.apiKey;

// Estados reactivos
const mapRef = ref(null);
const isMapReady = ref(false); // Bandera para saber si el mapa está listo

// Props
const props = defineProps({
  locations: {
    type: Array,
    required: true
  },
  zoom: {
    type: Number,
    default: 14
  },
});

// Estados derivados de las props
const locations = ref(props.locations);
const zoom = ref(props.zoom);
const centerMap = ref(null);

// Icono del marcador
let markerIcon;

// Cargar el icono del marcador
import('/images/marker_1.png').then((module) => {
  markerIcon = module.default;
  checkMapReadiness(); // Comprobar si el mapa está listo después de cargar el icono
});

// Función para verificar si todas las condiciones están listas para mostrar el mapa
function checkMapReadiness() {
  if (locations.value && locations.value.length > 0 && markerIcon) {
    centerMap.value = {
      lat: locations.value[0].lat,
      lng: locations.value[0].lng,
    };
    isMapReady.value = true; // Solo habilitar el mapa cuando todas las condiciones se cumplan
  }
}

// Observamos los cambios en las props y configuramos el centro del mapa y la bandera de readiness
watchEffect(() => {
  if (props.locations && props.locations.length > 0) {
    locations.value = props.locations;
    zoom.value = props.zoom || 14;

    checkMapReadiness();
  }
});

// Repetimos la comprobación cuando el componente esté montado
onMounted(() => {
  checkMapReadiness();
});

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

<style lang="scss"></style>
