<template>
    <div class="flex items-center justify-center size-full">
        <!-- Asegúrate de que el evento @ready está correctamente manejado -->
        <ScriptGoogleMaps ref="maps" :center="query" :markers="markers" :mapOptions="mapOptions"
            class="group min-w-full min-h-full" @ready="handleReady" />

        <!-- Listado de clínicas -->
        <div class="absolute left-0">
            <ul class="clinics p-8 hidden lg:flex flex-col list-none">
                <li v-for="location in locations" :key="location.id" class="mb-1">
                    <button
                        class="custom-btn m-0 py-1 px-3 font-light text-sm appearance-none cursor-pointer select-none text-nude-8 bg-blue-1 rounded-md"
                        @click="() => updateMapAndContent(location.id)" v-html="location.title.rendered">
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

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

const isLoaded = ref(false)
const maps = ref()
const query = ref({ lat: 40.855242, lng: -0.486289 })
const defaultCenter = { lat: 40.855242, lng: -0.486289 }
const defaultZoom = 7.25

const center = ref({
    lat: props.lat !== null ? props.lat : defaultCenter.lat,
    lng: props.lng !== null ? props.lng : defaultCenter.lng
})

const zoom = ref(props.zoom !== null ? props.zoom : defaultZoom)
const markers = ref([])

// Obtener locations de la API usando useAsyncData
const { data: locations, error: locationsError } = await useAsyncData('locations', async () => {
    const response = await getClinicas({
        ids: props.related && props.related.length > 0 ? props.related : null
    });
    return response.filter(
        clinica => clinica.acf && clinica.acf.destacar_post && clinica.acf.destacar_post.includes('Destacado')
    );
});

function updateMapAndContent(locationId) {
    const location = locations.value.find((loc) => loc.id === locationId);

    if (location && maps.value && typeof maps.value.setCenter === 'function') {
        // Cambiar el centro del mapa
        maps.value.setCenter({
            lat: location.acf.lat,
            lng: location.acf.lng
        });

        // Cambiar el zoom
        maps.value.setZoom(15);

        // Emitir evento para actualizar el contenido
        emit('update-content', location.content.rendered);
    } else {
        console.error('El mapa no está inicializado correctamente o la función setCenter no está disponible.');
    }
}



// Función para agregar los marcadores al mapa
const markerIcon = '/images/marker_1.png';
function addMarkersToMap(mapInstance) {
  if (!locations.value || locations.value.length === 0) return;

  // Limpiar los marcadores previos
  markers.value.forEach(marker => marker.setMap(null)); // Remover los marcadores previos
  markers.value = [];

  // Iterar sobre las ubicaciones para crear los marcadores
  locations.value.forEach(location => {
    if (location.acf && location.acf.lat && location.acf.lng) {
      const marker = new google.maps.Marker({
        position: { lat: location.acf.lat, lng: location.acf.lng }, // Asegúrate de que lat/lng existan
        map: mapInstance, // Asignar el mapa al que pertenece el marcador
        title: location.title.rendered,
        icon: markerIcon // Si tienes un ícono personalizado
      });

      // Agregar el marcador a la lista de marcadores
      markers.value.push(marker);

      // Opcional: Añadir un evento para hacer algo al hacer clic en el marcador
      marker.addListener('click', () => {
        updateMapAndContent(location.id); // Actualizar centro del mapa y contenido
      });
    }
  });
}
// console.log('Ubicaciones:', locations.value);

// Manejar cuando el mapa esté listo
function handleReady({ map }) {
  console.log('Mapa recibido:', map); // Para inspeccionar el objeto

  // Accedemos a la instancia real del mapa con `map.value`
  const actualMap = map.value;

  if (actualMap && typeof actualMap.getCenter === 'function') {
    // Guardar la instancia correcta del mapa
    maps.value = actualMap;

    addMarkersToMap(actualMap)

    // Establecer el centro actual del mapa
    center.value = actualMap.getCenter();

    // Escuchar el evento de cambio de centro
    actualMap.addListener('center_changed', () => {
      center.value = actualMap.getCenter();
    });

    isLoaded.value = true;
  } else {
    console.error('No se encontró la instancia correcta de Google Maps o getCenter no está disponible.');
  }
}


// Observar cambios en `locations` y actualizar marcadores
watch(locations, (newLocations) => {
    if (maps.value) {
        addMarkersToMap(maps.value);
    }
});

// Diseño del mapa
const mapOptions = {
    zoom: zoom.value, // Usa el valor de zoom predeterminado o el de las props
    center: center.value, // Centra el mapa
    mapId: 'da22b5096c61341',
    styles: [
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
}

</script>

<style lang="scss" scoped>
// empty style
</style>
