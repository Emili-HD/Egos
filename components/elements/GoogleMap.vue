<template>
  <GoogleMap api-key="AIzaSyA2wicYs8djzSjI4hXjbp15z6GBF3zO6YU" class="clinicas__egos-map" ref="mapRef" :center="centerMap"
    :zoom="zoom" :styles="mapStyles">
    <CustomControl position="LEFT_CENTER" class="clinics">
      <ul class="clinics">
        <li v-for="location in locations" :key="location.id">
          <button class="custom-btn" @click="() => updateMapAndContent(location.id)" v-html=" location.title.rendered"></button>
        </li>
      </ul>
    </CustomControl>
    <Marker v-for="(location, i) in locations" :options="{ position: { lat: location.acf.lat, lng: location.acf.lng }, anchorPoint: 'BOTTOM_CENTER', icon: markerIcon,}" :key="i" />
  </GoogleMap>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getClinicas } from '@/composables/useApi'

import {
  GoogleMap,
  Marker,
  CustomControl,
} from 'vue3-google-map'

let markerIcon;
import('/images/marker_1.png').then((module) => {
  markerIcon = module.default;
});
let imageCenter;
import('/images/egos/egos-balmes.jpg').then((module) => {
  imageCenter = module.default;
});

// Propiedades reactivas
const mapRef = ref(null)
const locations = ref([])
const centerMap = ref({ lat: 40.855242, lng: -0.486289 });
const zoom = ref(7.25);
const emit = defineEmits(['update-content']);

// Métodos
const updateMapAndContent = (locationId) => {
  // Buscar por el ID numérico del objeto, que es location.id
  const location = locations.value.find(loc => loc.id === locationId);
  if (location) {
    centerMap.value = { lat: location.acf.lat, lng: location.acf.lng };
    zoom.value = 15;
    emit('update-content', location.content.rendered);
  }
};

const loadClinicas = async () => {
  try {
    const postsResponse = await getClinicas()
    locations.value = postsResponse.data
  } catch (error) {
    console.error(error)
  }
}

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

// Ciclo de vida
onMounted(async () => {
  await loadClinicas()
})
</script>

<style lang="scss">
.clinicas__egos-map {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-xl);
  overflow: hidden;

  @media (max-width: 767px), (max-width: 1024px) and (orientation: portrait) {
      border-radius: 0;
  }

  .gm-style .gm-style-iw-d,
  .gm-style .gm-style-iw-d,
  .gm-style .gm-style-iw-c,
  .gm-style .gm-style-iw-t {
    color: var(--blue-1);
    // background: var(--nude-8);
  }

}

.gm-style .gm-style-iw-a {
  margin-top: -50px;
}

.gm-style .gm-style-iw-c {
  width: 350px !important;
  top: 0px !important;
  left: 0px !important;
  // box-shadow: var(--shadow) !important;
  // border: 1px solid rgba(72, 181, 233, 0.6);
}

.custom-control-wrapper {
  margin-left: calc(var(--spacing) - var(--gap));
  display: flex !important;
  flex-direction: column;

  @media (max-width: 767px), (max-width: 1024px) and (orientation: portrait) {
    display: none !important;
  }

  .clinics {
    list-style: none;
    margin-bottom: 0;

    li {
      margin-bottom: 0.3rem;
    }
  }

  .custom-btn {
    margin: 0px;
    padding: 3px 12px;
    font-weight: 300;
    font-size: 0.85rem;
    appearance: none;
    cursor: pointer;
    user-select: none;
    color: var(--nude-8);
    background-color: var(--blue-1);
    border-radius: .25rem;
  }
}
</style>
