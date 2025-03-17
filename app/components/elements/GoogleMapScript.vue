<template>
    <div class="flex items-center justify-center size-full" ref="mapElement">
        <!-- Asegúrate de que el evento @ready está correctamente manejado -->
        <!-- <ScriptGoogleMaps ref="maps" :center="query" :markers="markers" :mapOptions="mapOptions"
            :apiKey="$config.public.scripts.googleMaps.apiKey" class="group min-w-full min-h-full" @ready="handleReady">
            <template #placeholder="{ placeholder }">
                <img :src="markerIcon" alt="Map Placeholder">
            </template>
        </ScriptGoogleMaps> -->

        <!-- Listado de clínicas -->
        <div class="absolute left-0 p-8 flex flex-col-reverse">
            <ul v-for="location in locations" :key="location.id" class="hidden lg:flex flex-col list-none">
                <!-- Segundo bucle: iterar sobre las localizaciones dentro de cada clínica -->
                <li v-for="(localizacion, index) in location.acf.localizaciones" :key="`${location.id}-${index}`"
                    class="mb-1">
                    <button
                        class="custom-btn m-0 py-1 px-3 font-light text-sm appearance-none cursor-pointer select-none text-nude-8 bg-blue-1 rounded-md"
                        @click="() => updateMapAndContent(location.id, index)" v-html="localizacion.id"></button>
                </li>
            </ul>
        </div>
    </div>
</template>

<!-- <script setup>
    // import { useScriptGoogleMaps } from '@nuxt/scripts';

    // Props
    const props = defineProps({
        related: { type: Array, default: () => [] },
        lat: { type: Number, default: null },
        lng: { type: Number, default: null },
        zoom: { type: Number, default: null },
    });

    // Referencias y estados
    const mapElement = ref(null);
    const mapInstance = ref(null);
    const markers = ref([]);
    const isLoaded = ref(false);

    const defaultCenter = { lat: 40.855242, lng: -0.486289 };
    const center = ref({
        lat: props.lat !== null ? props.lat : defaultCenter.lat,
        lng: props.lng !== null ? props.lng : defaultCenter.lng,
    });
    const zoom = ref(props.zoom !== null ? props.zoom : 7.25);

    // Obtener locations de la API
    const { data: locations, error: locationsError } = await useAsyncData('locations', async () => {
        const response = await getClinicas({
            ids: props.related?.length ? props.related : null,
        });
        return response.filter(clinica => clinica.acf?.lat && clinica.acf?.lng);
    });

    // Carga la API de Google Maps
    const { onLoaded } = useScriptGoogleMaps({
        apiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    onMounted(() => {
        onLoaded(async (google) => {
            const maps = google.maps;

            // Inicializa el mapa
            mapInstance.value = new maps.Map(mapElement.value, {
                center: center.value,
                zoom: zoom.value,
                mapId: '403ea18381053eae',
                styles: mapStyles, // Usa el estilo definido
            });

            isLoaded.value = true;

            // Agrega los marcadores
            addMarkersToMap(maps);
        });
    });

    // Función para agregar marcadores
    function addMarkersToMap(maps) {
        if (!locations.value?.length) {
            console.warn('No hay ubicaciones disponibles para agregar marcadores.');
            return;
        }

        // Limpia los marcadores existentes
        markers.value.forEach(marker => marker.setMap(null));
        markers.value = [];

        // Agrega los nuevos marcadores
        locations.value.forEach((location) => {
            const marker = new maps.marker.AdvancedMarkerElement({
                position: { lat: parseFloat(location.acf.lat), lng: parseFloat(location.acf.lng) },
                map: mapInstance.value,
                title: location.title?.rendered || '',
            });

            marker.element.addEventListener('click', () => {
                updateMapAndContent(location.id);
            });

            markers.value.push(marker);
        });

        console.log('Marcadores agregados:', markers.value.length);
    }

    // Actualizar el centro y el contenido del mapa
    function updateMapAndContent(locationId) {
        const location = locations.value.find(loc => loc.id === locationId);

        if (!location?.acf?.lat || !location?.acf?.lng) {
            console.error('No se encontró la ubicación o faltan coordenadas.');
            return;
        }

        mapInstance.value.panTo({
            lat: parseFloat(location.acf.lat),
            lng: parseFloat(location.acf.lng),
        });

        mapInstance.value.setZoom(14);
        console.log('Mapa actualizado para la ubicación:', location.title?.rendered || location.id);
    }

    // Estilos del mapa
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
    ];
</script> -->

<!-- <script setup>
    const props = defineProps({
        related: {
            type: Array
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
    const maps = ref(null)
    const query = ref({ lat: 40.855242, lng: -0.486289 })
    const defaultCenter = { lat: 40.855242, lng: -0.486289 }
    const defaultZoom = 7.25

    const emit = defineEmits(['update-content'])

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
            clinica => clinica.acf && !clinica.acf.destacar_post && !clinica.acf.destacar_post.includes('Destacado')
        );
    });    

    function updateMapAndContent(locationId, index) {
        const location = locations.value.find((loc) => loc.id === locationId);
        const localizacion = location?.acf?.localizaciones[index];

        if (localizacion) {
            console.log('Latitud:', localizacion.lat);
            console.log('Longitud:', localizacion.lng);

            // Usa setCenter para actualizar el centro del mapa
            setCenter(parseFloat(localizacion.lat), parseFloat(localizacion.lng));

            emit('update-content', localizacion.informacion)

            // Ajusta el zoom si maps.value tiene un método para ello
            if (maps.value && typeof maps.value.setZoom === 'function') {
                maps.value.setZoom(14);
            } else {
                console.warn('El zoom no se puede ajustar porque maps.value no tiene setZoom.');
            }
        } else {
            console.error('Localización no encontrada.');
        }
    }

    function setCenter(lat, lng) {
        let mapInstance = maps.value?.map || maps.value?.instance || maps.value;

        if (mapInstance && typeof mapInstance.panTo === 'function') {
            mapInstance.panTo({ lat, lng });
            console.log('Centro del mapa ajustado con panTo:', { lat, lng });
        } else if (mapInstance?.center) {
            mapInstance.center = { lat, lng };
            console.log('Centro del mapa ajustado directamente:', mapInstance.center);
        } else {
            console.error('No se puede ajustar el centro. El mapa no está correctamente inicializado.');
        }
    }


    const markerIcon = '/images/marker_1.png';
    function handleReady({ map }) {
        maps.value = map.value;

        if (maps.value) {
            console.log('Mapa inicializado:', maps.value);

            isLoaded.value = true;

            // Escuchar eventos del mapa
            maps.value.addListener('center_changed', () => {
                const newCenter = maps.value.getCenter();
                center.value = {
                    lat: newCenter.lat(),
                    lng: newCenter.lng(),
                };
            });

            // Agregar marcadores
            // addMarkersToMap(maps.value);
        } else {
            console.error('No se pudo inicializar el mapa.');
        }
    }

    onMounted(() => {      
        if (!maps.value || typeof maps.value.createAdvancedMapMarker !== 'function') {
            console.error('El método createAdvancedMapMarker no está disponible.');
            return;
        }

        if (!locations.value || locations.value.length === 0) {
            console.warn('No hay ubicaciones disponibles para agregar marcadores.');
            return;
        }

        console.log('Agregando marcadores para todas las ubicaciones...');
        console.log('Ubicaciones:', locations.value);
        

        // Itera sobre las ubicaciones y crea marcadores avanzados
        locations.value.forEach((location) => {
            if (location.acf && location.acf.lat && location.acf.lng) {
                // Crear el marcador avanzado
                const marker = maps.value.createAdvancedMapMarker({
                    position: {
                        lat: parseFloat(location.acf.lat),
                        lng: parseFloat(location.acf.lng),
                    },
                    icon: markerIcon, // Añade el ícono personalizado
                });

                markers.value.push(marker);
            }
        });

        console.log('Marcadores agregados:', markers.value);
    });



    // Diseño del mapa
    const mapOptions = {
        zoom: zoom.value, // Usa el valor de zoom predeterminado o el de las props
        center: center.value, // Centra el mapa
        mapId: '403ea18381053eae',
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
 -->
