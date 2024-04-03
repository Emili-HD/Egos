import { asSitemapUrl, defineSitemapEventHandler } from '#imports';

export default defineSitemapEventHandler(async () => {
  const wpBaseUrl = 'https://test.clinicaegos.com/';
  let allCirugias = [];
  const perPage = 100;
  let page = 1;
  let morePagesAvailable = true;

  while (morePagesAvailable) {
    const fetchedCirugias = await $fetch(`${wpBaseUrl}/wp-json/wp/v2/tratamiento?per_page=${perPage}&page=${page}`).then(cirugias =>
      cirugias.map(cirugia => {
        // Extrae la ruta desde el campo `link`
        const url = new URL(cirugia.link);
        const path = url.pathname; // Obtiene solo el pathname

        // Prepara las imágenes para el sitemap
        const images = cirugia.featured_image_data ? [{
          loc: cirugia.featured_image_data.src, // URL de la imagen
          caption: cirugia.featured_image_data.caption, // Pie de foto de la imagen
          title: cirugia.featured_image_data.alt, // Título (alt text) de la imagen
          // Puedes añadir otros campos como geoLocation y license si están disponibles
        }] : [];

        return asSitemapUrl({
          loc: path, // Usa directamente el pathname extraído
          lastmod: cirugia.modified_gmt,
          images, // Añade las imágenes al sitemap
        });
      })
    );

    allCirugias = [...allCirugias, ...fetchedCirugias];

    if (fetchedCirugias.length < perPage) {
      morePagesAvailable = false;
    } else {
      page++;
    }
  }

  // Combina y devuelve
  return allCirugias;
});
