// stores/page.js
import { defineStore } from 'pinia';
import { getPage } from '@/composables/useApi';

export const usePagesStore = defineStore('pages', {
    state: () => ({
        pages: {}, // Objeto para almacenar páginas con el ID o slug como clave
    }),
    actions: {
        // Obtener una página específica por ID o slug
        async fetchPage(identifier) {
            if (this.pages[identifier]) {
                // Si la página ya está en el estado, devuélvela directamente
                return this.pages[identifier];
            }

            try {
                const page = await getPage(identifier);
                if (page) {
                    // Almacena la página en el estado con su ID o slug como clave
                    this.pages[identifier] = page;
                    return page;
                }

                throw new Error(`Página con identificador "${identifier}" no encontrada.`);
            } catch (error) {
                console.error('Error al obtener la página:', error);
                throw error;
            }
        },
    },
});
