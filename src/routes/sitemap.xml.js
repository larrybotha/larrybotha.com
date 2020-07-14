import {getPosts} from './blog/_posts.js';
import {getNotes} from './notes/_notes.js';

const renderLastModTag = ({dateUpdated, datePublished}) => {
  const date = dateUpdated || datePublished;

  return date
    ? `
    <lastmod>
      ${new Date(date).toISOString()}
    </lastmod>
  `
    : '';
};

const render = ({
  pages,
  posts,
  notes,
}) => `<?xml version="1.0" encoding="UTF-8" ?>
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
      ${renderLastModTag(post)}
    </url>
  `,
    )
    .join('\n')}

  ${notes
    .map(
      note => `
    <url>
      <loc>https://larrybotha.com/blog/${note.slug}/</loc>
      ${renderLastModTag(note)}
    </url>
  `,
    )
    .join('\n')}
</urlset>
`;

export async function get(req, res, next) {
  const pages = ['', 'blog/', 'notes/'];
  const [posts, notes] = await Promise.all(
    [getPosts, getNotes].map(async fn => await fn()),
  );
  const feed = render({pages, posts, notes});

  res.setHeader('Cache-Control', `max-age=0, s-max-age=${24 * 60 * 60}`); // 10 minutes
  res.setHeader('Content-Type', 'application/rss+xml');

  res.end(feed);
}
