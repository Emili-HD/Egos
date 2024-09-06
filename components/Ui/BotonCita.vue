<template>
    <div v-if="isLoading">
        <!-- ...Cargando -->
    </div>
    <div class="fixed-button" v-else-if="!isLoading && botonCita">
        <ElementsButton class="gold text-clamp-xs uppercase" href="#formulario">
            {{ botonCita }}
        </ElementsButton>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'

const props = defineProps({
    data: {
        type: String,
        default: null
    }
})

// Estado reactivo para el texto del botón y el estado de carga
const botonCita = ref(null);
const isLoading = ref(true);

const fetchBoton = async () => {
    try {
        // Verificar que estamos en el cliente (navegador) y no en el servidor
        if (import.meta.client) {
            // Petición a la API para obtener las opciones globales
            const { data: globalSettings } = await useAsyncData('boton', () => egosSettings({name: 'boton_cita'}));

            // Depurando la respuesta de la API
            // console.log('Respuesta de la API:', globalSettings.value);

            // Si activar_boton es un array que incluye "true" y hay un valor en boton_cita, lo asignamos
            if (globalSettings.value && Array.isArray(globalSettings.value.activar_boton)) {
                // console.log('activar_boton:', globalSettings.value.activar_boton);

                if (globalSettings.value.activar_boton.includes("true")) {
                    // console.log('activar_boton está activo, usando globalSettings.boton_cita');
                    botonCita.value = globalSettings.value.boton_cita; // "Consigue tu descuento"
                } else if (!globalSettings.value.activar_boton.includes("true")) {
                    // console.log('activar_boton está inactivo, usando props.data');
                    botonCita.value = props.data; // Fallback a props.data (Cita con el doctor)
                }
            }

            // Si el valor de `botonCita` sigue siendo null, asignar directamente el valor de props.data como último recurso
            if (!botonCita.value && props.data) {
                // console.log('No hay valor en botonCita, usando props.data');
                botonCita.value = props.data;
            }
        }
    } catch (error) {
        console.error('Error fetching global button settings:', error);
    } finally {
        isLoading.value = false; // Cambiar isLoading a false después de la petición
    }
};

// Ejecutar la función al montar el componente
onMounted(async () => {
    await nextTick()
    await fetchBoton();
});
</script>

<style scoped>
.fixed-button {
    @apply bg-blue-1 fixed top-[calc(100%-4.3rem)] w-full p-4 z-[998] flex flex-row justify-center items-center gap-2 lg:hidden
}
</style>
