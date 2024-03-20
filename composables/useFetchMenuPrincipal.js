// composables/useFetchMenuPrincipal.js
import { useRouter } from 'vue-router';
import { menuPrincipal } from './useApi';

export const useFetchMenuPrincipal = async () => {
  try {
    const data = await menuTratamientos();
    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      useRouter().push('/error');
    }
    // Manejo de otros errores
    throw error;
  }
};
