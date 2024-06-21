import { asSitemapUrl, defineSitemapEventHandler } from '#imports';

export default defineSitemapEventHandler(async () => {
  const wpBaseUrl = 'https://test.clinicaegos.com/';
  let allLandings = [];
  let perPage = 100;
  let page = 1;
  let morePagesAvailable = true;

  while (morePagesAvailable) {
    const fetchedLandings = await $fetch(`${wpBaseUrl}/wp-json/wp/v2/landing?per_page=${perPage}&page=${page}`).then(landings =>
      landings.map(landing => {
        // Prepara las imágenes para incluir en el sitemap, si están disponibles
        const images = landing.featured_image_data ? [{
          loc: landing.featured_image_data.url, // URL de la imagen destacada
          caption: landing.featured_image_data.caption, // Pie de foto de la imagen
          title: landing.featured_image_data.alt, // Título de la imagen (texto alternativo)
          // Puedes añadir otros campos como geoLocation y license si están disponibles
        }] : [];

        return asSitemapUrl({
          loc: `/promocion/${landing.slug}`, // Localización de la landing page
          lastmod: landing.modified_gmt, // Fecha de última modificación
          images, // Incluye la información de las imágenes en el sitemap
        });
      })
    );

    allLandings = [...allLandings, ...fetchedLandings];

    if (fetchedLandings.length < perPage) {
      morePagesAvailable = false;
    } else {
      page++;
    }
  }

  return allLandings;
});

