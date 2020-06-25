import {get, writable} from 'svelte/store';

const articlesStore = writable({posts: [], notes: []});

async function getEntities(context, path) {
  const response = await context.fetch(path);

  return await response.json();
}

async function getArticles(context) {
  const storeValues = get(articlesStore);
  await Promise.all(
    [
      {key: 'posts', path: '../blog.json'},
      {key: 'notes', path: '../notes.json'},
    ].map(async ({key, path}) => {
      if (!storeValues[key].length) {
        const result = await getEntities(context, path);

        articlesStore.update(values => ({...values, [key]: result}));
      }
    }),
  );

  return get(articlesStore);
}

export {getArticles, articlesStore};
