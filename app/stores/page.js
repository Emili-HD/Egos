// stores/page.js
import { defineStore } from 'pinia';
import { getPage } from '@/composables/useApi';

export const usePagesStore = defineStore('pages', {
    state: () => ({
        pages: {},
    }),
    actions: {
        async fetchPage(identifier) {
            if (this.pages[identifier]) {
                return this.pages[identifier];
            }

            try {
                const page = await getPage(identifier);
                if (page) {
                    this.pages[identifier] = page;
                    return page;
                }
            } catch (error) {
                console.error(`Error al obtener la página "${identifier}":`, error);
            }

            return null; // No lanzar error, simplemente devolver null
        },
    },
});
