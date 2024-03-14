import { asSitemapUrl, defineSitemapEventHandler } from '#imports';

export default defineSitemapEventHandler(async () => {
  const wpBaseUrl = process.env.WP_URL;
  let allClinicas = [];
  let perPage = 100;
  let page = 1;
  let morePagesAvailable = true;

  while (morePagesAvailable) {
    const fetchedClinicas = await $fetch(`${wpBaseUrl}/wp-json/wp/v2/clinica?per_page=${perPage}&page=${page}`).then(clinicas => 
      clinicas.map(clinica => asSitemapUrl({
        loc: `/clinica/${clinica.slug}`,
        lastmod: clinica.modified_gmt,
      }))
    );

    allClinicas = [...allClinicas, ...fetchedClinicas];

    if (fetchedClinicas.length < perPage) {
      morePagesAvailable = false;
    } else {
      page++;
    }
  }

  return allClinicas;
});
