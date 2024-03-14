import { asSitemapUrl, defineSitemapEventHandler } from '#imports';

export default defineSitemapEventHandler(async () => {
  const wpBaseUrl = process.env.WP_URL;
  let allTestimonios = [];
  let perPage = 100;
  let page = 1;
  let morePagesAvailable = true;

  while (morePagesAvailable) {
    const fetchedTestimonios = await $fetch(`${wpBaseUrl}/wp-json/wp/v2/testimonio?per_page=${perPage}&page=${page}`).then(testimonios => 
      testimonios.map(testimonio => asSitemapUrl({
        loc: `/opinion-egos/${testimonio.slug}`,
        lastmod: testimonio.modified_gmt,
      }))
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
