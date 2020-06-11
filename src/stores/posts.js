import {get, writable} from 'svelte/store';

const postsStore = writable([]);

async function getPosts(context) {
  let posts = get(postsStore);

  if (!posts.length) {
    const response = await context.fetch(`../blog.json`);

    posts = await response.json();

    postsStore.set(posts);
  }

  return posts;
}

export {getPosts, postsStore};
