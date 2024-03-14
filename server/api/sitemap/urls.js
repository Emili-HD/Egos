import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  // Asume que WP_URL es algo como 'https://tusitio.wordpress.com'
  const wpBaseUrl = process.env.WP_URL;

  // Fetch posts
  const posts = await $fetch(`${wpBaseUrl}/wp-json/wp/v2/posts`).then(posts => 
    posts.map(post => asSitemapUrl({
      loc: `/blog/${post.slug}`,
      lastmod: post.modified_gmt,
    }))
  );

  // Fetch pages
  const pages = await $fetch(`${wpBaseUrl}/wp-json/wp/v2/pages`).then(pages => 
    pages.map(page => asSitemapUrl({
      loc: `/${page.slug}`,
      lastmod: page.modified_gmt,
    }))
  );

  // Fetch clinicas
  const clinicas = await $fetch(`${wpBaseUrl}/wp-json/wp/v2/clinica`).then(clinicas => 
    clinicas.map(clinica => asSitemapUrl({
      loc: `/clinica/${clinica.slug}`,
      lastmod: clinica.modified_gmt,
    }))
  );

  // Combine and return
  return [...posts, ...pages, ...clinicas];
});
