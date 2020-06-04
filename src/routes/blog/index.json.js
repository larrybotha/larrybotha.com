import {getPosts} from './_posts.js';

let contents;

export async function get(req, res) {
  if (!contents) {
    const ps = await getPosts();

    contents = JSON.stringify(
      ps.map(post => {
        return {
          title: post.title,
          slug: post.slug,
        };
      }),
    );
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(contents);
}
