import { defineStore } from 'pinia';
import { getTratamiento } from '@/composables/useApi';

export const useTreatmentsStore = defineStore('treatments', {
    state: () => ({
        treatments: {}, // Almacena tratamientos por slug o ID
    }),
    actions: {
        async fetchTreatment({ id = null, slug = null }) {
            // Verificar si el identificador es válido antes de hacer la consulta
            if (!id && !slug) {
                console.warn("fetchTreatment: ID o slug no proporcionado. Se canceló la solicitud.");
                return null;
            }

            const key = id || slug;
            if (this.treatments[key]) {
                return this.treatments[key];
            }

            try {
                const treatment = await getTratamiento({ id, slug });
                if (treatment) {
                    this.treatments[key] = treatment;
                    return treatment;
                }

                // console.warn(`fetchTreatment: Tratamiento con identificador "${key}" no encontrado.`);
                return null;
            } catch (error) {
                console.error('Error al obtener el tratamiento:', error);
                throw error;
            }
        },
    },
});
