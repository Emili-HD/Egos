import { asSitemapUrl, defineSitemapEventHandler } from '#imports';

export default defineSitemapEventHandler(async () => {
  const wpBaseUrl = process.env.WP_URL;
  let allLandings = [];
  let perPage = 100;
  let page = 1;
  let morePagesAvailable = true;

  while (morePagesAvailable) {
    const fetchedLandings = await $fetch(`${wpBaseUrl}/wp-json/wp/v2/landing?per_page=${perPage}&page=${page}`).then(landings => 
      landings.map(landing => asSitemapUrl({
        loc: `/promocion/${landing.slug}`,
        lastmod: landing.modified_gmt,
      }))
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
