export default defineEventHandler(async (event) => {
  // Aquí, usamos la función `useBody` para leer el cuerpo de la solicitud entrante, si es necesario.
  const body = await useBody(event);

  // Ejemplo de cómo construir la URL de destino. Ajusta los parámetros según sea necesario.
  const apiUrl = `https://maps.googleapis.com/maps/api/some_endpoint?key=${process.env.NUXT_PUBLIC_GOOGLE_MAP_API_KEY}`;

  try {
    // Realiza la llamada a la API.
    const response = await $fetch(apiUrl, {
      method: 'POST', // O GET, según sea necesario.
      body: body, // Solo si necesitas enviar datos en la solicitud.
    });

    // Devuelve la respuesta de la API al cliente.
    return response;
  } catch (error) {
    // Maneja errores como prefieras, posiblemente devolviendo un mensaje de error al cliente.
    return createError({ statusCode: 500, statusMessage: 'Error en la llamada a la API' });
  }
});
