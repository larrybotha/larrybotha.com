const {resolve} = require('path');
const {readdir, readFile} = require('fs').promises;
const {transform} = require('mdsvex');

async function getFiles(dir) {
  const dirents = await readdir(dir, {withFileTypes: true});
  const files = await Promise.all(
    dirents.map(dirent => {
      const res = resolve(dir, dirent.name);

      return dirent.isDirectory() ? getFiles(res) : res;
    }),
  );

  return Array.prototype.concat(...files);
}

async function getPosts() {
  const dir = resolve(process.cwd(), 'src/routes/blog');
  const files = await getFiles(dir);
  const indexFiles = files.filter(filename => {
    return filename.endsWith('index.svx');
  });
  const parser = transform();
  const posts = await Promise.all(
    indexFiles.map(async filename => {
      const contents = await readFile(filename, 'utf-8');
      const parsed = await parser.process({contents, filename});
      const frontMatter = parsed.data.fm || {};
      const slug = filename.split('/').slice(-2)[0];

      return {
        html: parsed.contents,
        slug,
        ...frontMatter,
      };
    }),
  );
  const sortedPosts = posts.sort((a, b) =>
    a.publishDate > b.publishDate ? 1 : -1,
  );

  return sortedPosts;
}

export {getPosts};
