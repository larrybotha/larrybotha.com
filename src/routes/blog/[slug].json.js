import {getPosts} from './_posts.js';

const lookup = new Map();

export async function get(req, res, next) {
  if (lookup.size === 0) {
    const posts = await getPosts();

    posts.forEach(post => {
      lookup.set(post.slug, JSON.stringify(post));
    });
  }
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const {slug} = req.params;

  if (lookup.has(slug)) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(lookup.get(slug));
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });

    res.end(
      JSON.stringify({
        message: `Not found`,
      }),
    );
  }
}
