// ~/composables/useMenuTratamientos.js
import { useAsyncData } from 'nuxt/app';

export const useMenuTratamientos = () => {
    return useAsyncData('menuTratamientos', async () => {
        const menuData = await getMenuTratamientos();
        return menuData;
    });
};
