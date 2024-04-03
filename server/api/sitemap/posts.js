import { asSitemapUrl, defineSitemapEventHandler } from '#imports';

export default defineSitemapEventHandler(async () => {
  const wpBaseUrl = 'https://test.clinicaegos.com/';
  let allPosts = [];
  let perPage = 100;
  let page = 1;
  let morePagesAvailable = true;

  while (morePagesAvailable) {
    const fetchedPosts = await $fetch(`${wpBaseUrl}/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}`).then(posts =>
      posts.map(post => {
        // Si el post tiene datos de la imagen destacada, prepara el campo images
        const images = post.featured_image_data ? [{
          loc: post.featured_image_data.src, // URL de la imagen destacada
          caption: post.featured_image_data.caption, // Pie de foto
          title: post.featured_image_data.alt, // Texto alternativo como título
          // Aquí puedes añadir geoLocation y license si están disponibles
        }] : [];

        return asSitemapUrl({
          loc: `/blog/${post.slug}`, // Localización del post en el sitio
          lastmod: post.modified_gmt, // Fecha de última modificación del post
          images, // Incluye las imágenes en la configuración del sitemap
        });
      })
    );

    allPosts = [...allPosts, ...fetchedPosts];

    if (fetchedPosts.length < perPage) {
      morePagesAvailable = false;
    } else {
      page++;
    }
  }

  return allPosts;
});
