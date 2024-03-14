import { asSitemapUrl, defineSitemapEventHandler } from '#imports';

export default defineSitemapEventHandler(async () => {
  const wpBaseUrl = process.env.WP_URL;
  let allMiembros = [];
  const perPage = 100;
  let page = 1;
  let morePagesAvailable = true;

  while (morePagesAvailable) {
    const fetchedMiembros = await $fetch(`${wpBaseUrl}/wp-json/wp/v2/doctor?per_page=${perPage}&page=${page}`).then(miembros =>
      miembros.map(miembro => {
        // Extrae la ruta desde el campo `link`
        const url = new URL(miembro.link);
        const path = url.pathname; // Obtiene solo el pathname

        return asSitemapUrl({
          loc: path, // Usa directamente el pathname extraído
          lastmod: miembro.modified_gmt,
        });
      })
    );

    allMiembros = [...allMiembros, ...fetchedMiembros];

    if (fetchedMiembros.length < perPage) {
      morePagesAvailable = false;
    } else {
      page++;
    }
  }

  // Combina y devuelve
  return allMiembros;
});
