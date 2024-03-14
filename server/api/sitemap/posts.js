import { asSitemapUrl, defineSitemapEventHandler } from '#imports';

export default defineSitemapEventHandler(async () => {
  const wpBaseUrl = process.env.WP_URL;
  let allPosts = [];
  let perPage = 100;
  let page = 1;
  let morePagesAvailable = true;

  while (morePagesAvailable) {
    const fetchedPosts = await $fetch(`${wpBaseUrl}/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}`).then(posts => 
      posts.map(post => asSitemapUrl({
        loc: `/blog/${post.slug}`,
        lastmod: post.modified_gmt,
      }))
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
