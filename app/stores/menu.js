// stores/menu.js
import { defineStore } from 'pinia';
import { getMenuTratamientos } from '@/composables/useApi'; 

export const useMenuStore = defineStore('menu', {
    state: () => ({
        isOpen: false,
        canOpen: true,
        menuData: {}, // Inicializamos como un objeto vacío
        menuError: null,
        isLoading: false,
    }),
    actions: {
        toggleMenu(open) {
            this.isOpen = open;
        },
        disableOpenTemporarily() {
            this.canOpen = false;
            setTimeout(() => {
                this.canOpen = true;
            }, 300); // Deshabilitar la apertura por 0.3 segundos
        },
        async fetchMenu() {
            this.isLoading = true;
            this.menuError = null;

            try {
                const response = await getMenuTratamientos();
                this.menuData = response || {}; // Aseguramos un objeto vacío
            } catch (error) {
                console.error('Error fetching menu data:', error);
                this.menuError = {
                    message: error.message || 'Error desconocido',
                };
            } finally {
                this.isLoading = false;
            }
        },
    },
});
