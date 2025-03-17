<template>
    <div v-if="isLoading">
        <!-- ...Cargando -->
    </div>
    <div class="fixed-button [html:not(.estetica):not(.blackfriday)_&]:bg-blue-1 [.estetica:not(.blackfriday)_&]:bg-vermell [.blackfriday_&]:bg-blackfriday"
        v-else-if="!isLoading && botonCita">
        <ElementsButton
            class="gold [.estetica:not(.blackfriday)_&]:!bg-rosa [.estetica:not(.blackfriday)_&]:![background-image:none] [.estetica:not(.blackfriday)_&]:!text-vermell text-clamp-xs uppercase"
            href="#formulario">
            {{ botonCita }}
        </ElementsButton>
    </div>
</template>

<script setup>
    const props = defineProps({
        data: {
            type: String,
            default: null
        }
    });

    // Estado reactivo para el texto del botón y el estado de carga
    const botonCita = ref(null);
    const isLoading = ref(true);

    const fetchBoton = async () => {
        try {
            if (import.meta.client) {
                const globalSettings = await egosSettings('boton_cita');

                if (globalSettings && Array.isArray(globalSettings.activar_boton)) {
                    if (globalSettings.activar_boton.includes("true")) {
                        botonCita.value = globalSettings.boton_cita; // "Consigue tu descuento"
                    } else {
                        botonCita.value = props.data; // Fallback a props.data (Cita con el doctor)
                    }
                }

                // Usar el fallback de props.data si todavía no hay valor
                botonCita.value ||= props.data;
            }
        } catch (error) {
            console.error('Error fetching global button settings:', error);
        } finally {
            isLoading.value = false; // Cambiar isLoading a false después de la petición
        }
    };

    // Ejecutar la función al montar el componente
    onMounted(async () => {
        await fetchBoton();
    });
</script>

<style scoped>
    .fixed-button {
        @apply fixed top-[calc(100%-4.3rem)] w-full p-4 z-[998] flex flex-row justify-center items-center gap-2 lg:hidden;
    }
</style>
