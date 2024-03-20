// composables/fetchSingleTratamientoBySlug.js
import { useRouter } from 'vue-router';
import { getSingleTratamientoBySlug, egosSettings } from '@/composables/useApi';

export const useFetchSingleTratamientoBySlug = async (slug) => {
  const router = useRouter(); // Obtiene la instancia del router para manejar redirecciones

  try {
    const response = await getSingleTratamientoBySlug(slug);
    const responseForm = await egosSettings('form_settings');

    // Asegúrate de manejar correctamente la respuesta vacía o inválida aquí
    if (response.data && response.data.length > 0) {
      const tratamiento = response.data[0];
      let form = null;
      if (responseForm.data && responseForm.data.form_settings) {
        form = responseForm.data;
      }
      return { tratamiento, form };
    } else {
      // Si no hay datos válidos, podrías lanzar un error o manejar de otra manera
      console.error('La respuesta de la API no contiene datos válidos.');
      throw new Error('NoData');
    }
  } catch (error) {
    console.error(error);
    router.push('/error'); // Redirige a la página de error personalizada
    throw error; // Continúa lanzando el error si necesitas manejo adicional fuera del composable
  }
};
