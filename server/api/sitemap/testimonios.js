import { asSitemapUrl, defineSitemapEventHandler } from '#imports';

export default defineSitemapEventHandler(async () => {
  const wpBaseUrl = 'https://test.clinicaegos.com/';
  let allTestimonios = [];
  let perPage = 100;
  let page = 1;
  let morePagesAvailable = true;

  while (morePagesAvailable) {
    const fetchedTestimonios = await $fetch(`${wpBaseUrl}/wp-json/wp/v2/testimonio?per_page=${perPage}&page=${page}`).then(testimonios =>
      testimonios.map(testimonio => {
        // Prepara las imágenes, si están disponibles
        const images = testimonio.featured_image_data ? [{
          loc: testimonio.featured_image_data.src,
          caption: testimonio.featured_image_data.caption,
          title: testimonio.featured_image_data.alt,
        }] : [];

        // Prepara los vídeos, asumiendo que acf.vimeo_video está disponible
        const videos = testimonio.acf && testimonio.acf.vimeo_video ? [{
          title: testimonio.title.rendered, // Puedes personalizar este título
          thumbnail_loc: '', // Necesitas especificar un thumbnail si es posible
          description: `Caso real: ${testimonio.title.rendered}`, // Puedes ajustar esta descripción
          content_loc: testimonio.acf.vimeo_video,
          player_loc: testimonio.acf.vimeo_video, // URL del reproductor Vimeo, igual que content_loc
          // Los siguientes campos son opcionales o específicos, ajústalos según tus necesidades
          // duration, expiration_date, rating, etc.
        }] : [];

        return asSitemapUrl({
          loc: `/opinion-egos/${testimonio.slug}`,
          lastmod: testimonio.modified_gmt,
          images,
          videos,
        });
      })
    );

    allTestimonios = [...allTestimonios, ...fetchedTestimonios];

    if (fetchedTestimonios.length < perPage) {
      morePagesAvailable = false;
    } else {
      page++;
    }
  }

  return allTestimonios;
});
