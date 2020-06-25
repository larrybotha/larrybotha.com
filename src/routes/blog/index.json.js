import {getPosts} from './_posts';

let contents;

export async function get(req, res) {
  if (!contents) {
    const posts = await getPosts();

    contents = JSON.stringify(
      posts.map(post => {
        return {
          title: post.title,
          slug: post.slug,
        };
      }),
    );
  }

  res.writeHead(200, {'Content-Type': 'application/json'});

  res.end(contents);
}
