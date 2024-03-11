<template>
   <GoogleMap api-key="AIzaSyA2wicYs8djzSjI4hXjbp15z6GBF3zO6YU" class="clinicas__egos-map" ref="mapRef" :center="centerMap"
      :zoom="props.zoom" :styles="mapStyles">
      <Marker :options="{ position: centerMap, anchorPoint: 'BOTTOM_CENTER', icon: markerIcon }" />
   </GoogleMap>
</template>

<script setup>
import { ref } from 'vue'
import {
   GoogleMap,
   Marker,
} from 'vue3-google-map'

// Estados reactivos
const mapRef = ref(null)

// Props
const props = defineProps({
  lat: Number,
  lng: Number,
  zoom: Number
});

const centerMap = ref({ lat: props.lat, lng: props.lng });
let markerIcon;
import('/images/marker_1.png').then((module) => {
   markerIcon = module.default;
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

<style lang="scss">
.clinicas__egos-map {
   width: 100%;
   height: 100%;
   border-radius: var(--radius-xl);
   overflow: hidden;
}
</style>
