import {getPosts} from './blog/_posts.js';

const render = (pages, posts) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${pages
    .map(
      page => `
    <url><loc>https://larrybotha.com/${page}</loc></url>
  `,
    )
    .join('\n')}

  ${posts
    .map(
      post => `
    <url>
      <loc>https://larrybotha.com/blog/${post.slug}/</loc>
      <lastmod>${new Date(post.date || Date.now()).toISOString()}</lastmod>
    </url>
  `,
    )
    .join('\n')}
</urlset>
`;

export async function get(req, res, next) {
  const pages = ['', 'blog/'];
  const posts = await getPosts();
  const feed = render(pages, posts);

  res.setHeader('Cache-Control', `max-age=0, s-max-age=${24 * 60 * 60}`); // 10 minutes
  res.setHeader('Content-Type', 'application/rss+xml');

  res.end(feed);
}
