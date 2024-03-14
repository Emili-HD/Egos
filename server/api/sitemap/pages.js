import { asSitemapUrl, defineSitemapEventHandler } from '#imports';

export default defineSitemapEventHandler(async () => {
  const wpBaseUrl = process.env.WP_URL;
  let allPages = [];
  let perPage = 100;
  let page = 1;
  let morePagesAvailable = true;

  while (morePagesAvailable) {
    const fetchedPages = await $fetch(`${wpBaseUrl}/wp-json/wp/v2/pages?per_page=${perPage}&page=${page}`).then(pages => 
      pages.map(page => asSitemapUrl({
        loc: `/${page.slug}`,
        lastmod: page.modified_gmt,
      }))
    );

    allPages = [...allPages, ...fetchedPages];

    if (fetchedPages.length < perPage) {
      morePagesAvailable = false;
    } else {
      page++;
    }
  }

  return allPages;
});
