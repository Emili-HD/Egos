<template>
    <div v-if="isLoading">
        <!-- ...Cargando -->
    </div>
    <div class="fixed-button [html:not(.estetica)_&]:bg-blue-1 [.estetica_&]:bg-vermell" v-else-if="!isLoading && botonCita">
        <ElementsButton class="gold [.estetica_&]:!bg-rosa [.estetica_&]:![background-image:none] [.estetica_&]:!text-vermell text-clamp-xs uppercase" href="#formulario">
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
        if (import.meta.client) {
            const { data: globalSettings } = await useAsyncData('boton', () => egosSettings({name: 'boton_cita'}));
            if (globalSettings.value && Array.isArray(globalSettings.value.activar_boton)) {

                if (globalSettings.value.activar_boton.includes("true")) {
                    botonCita.value = globalSettings.value.boton_cita; // "Consigue tu descuento"
                } else if (!globalSettings.value.activar_boton.includes("true")) {
                    botonCita.value = props.data; // Fallback a props.data (Cita con el doctor)
                }
            }

            if (!botonCita.value && props.data) {
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
    @apply fixed top-[calc(100%-4.3rem)] w-full p-4 z-[998] flex flex-row justify-center items-center gap-2 lg:hidden
}
</style>
