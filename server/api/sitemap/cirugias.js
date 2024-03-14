import { asSitemapUrl, defineSitemapEventHandler } from '#imports';

export default defineSitemapEventHandler(async () => {
  const wpBaseUrl = process.env.WP_URL;
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

        return asSitemapUrl({
          loc: path, // Usa directamente el pathname extraído
          lastmod: cirugia.modified_gmt,
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
