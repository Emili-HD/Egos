export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const apiUrl = `https://maps.googleapis.com/maps/api/some_endpoint?key=${process.env.NUXT_PUBLIC_GOOGLE_MAP_API_KEY}`;

  try {
    const response = await $fetch(apiUrl, {
      method: 'POST', // O GET, según corresponda.
      body: body, // Asegúrate de que el body está optimizado.
    });

    return response;
  } catch (error) {
    return createError({ statusCode: 500, statusMessage: 'Error en la llamada a la API' });
  }
});

