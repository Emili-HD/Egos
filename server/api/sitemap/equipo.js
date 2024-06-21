import { asSitemapUrl, defineSitemapEventHandler } from '#imports';

export default defineSitemapEventHandler(async () => {
  const wpBaseUrl = 'https://test.clinicaegos.com/';
  let allMiembros = [];
  const perPage = 100;
  let page = 1;
  let morePagesAvailable = true;

  while (morePagesAvailable) {
    const fetchedMiembros = await $fetch(`${wpBaseUrl}/wp-json/wp/v2/doctor?per_page=${perPage}&page=${page}`).then(miembros =>
      miembros.map(miembro => {
        const url = new URL(miembro.link);
        const path = url.pathname; // Obtiene solo el pathname

        // Prepara las imágenes para el sitemap
        const images = miembro.featured_image_data ? [{
          loc: miembro.featured_image_data.url, // URL de la imagen
          caption: miembro.featured_image_data.caption, // Pie de foto de la imagen
          title: miembro.featured_image_data.alt, // Título (alt text) de la imagen
        }] : [];

        return {
          path, // Guarda el path para verificarlo más adelante
          sitemapUrl: asSitemapUrl({
            loc: path, // Usa directamente el pathname extraído
            lastmod: miembro.modified_gmt,
            images
          })
        };
      })
    ).then(urls => 
      // Filtra los miembros que no deben aparecer en el sitemap
      urls.filter(({ path }) => 
        !path.includes('atencion-al-paciente') 
        && !path.includes('enfermeria') 
        && !path.includes('asesoramiento-al-paciente')
        && !path.includes('fisioterapia')  
        && !path.includes('direccion-y-administracion')
      ).map(({ sitemapUrl }) => sitemapUrl)
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
