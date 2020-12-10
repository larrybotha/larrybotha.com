const parseFrontmatter = require('gray-matter');
const {resolve} = require('path');
const {readdir, readFile} = require('fs').promises;
const {compile} = require('mdsvex');

async function getFiles(dir) {
  const dirents = await readdir(dir, {withFileTypes: true});
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);

      return dirent.isDirectory() ? getFiles(res) : res;
    }),
  );

  return Array.prototype.concat(...files);
}

async function getArticles(path = 'src/routes/blog') {
  const dir = resolve(process.cwd(), path);
  const files = await getFiles(dir);
  const indexFiles = files.filter((filename) => {
    return filename.endsWith('index.svx');
  });
  const posts = await Promise.all(
    indexFiles.map(async (filename) => {
      const contents = await readFile(filename, 'utf-8');
      const parsed = await compile(contents, {filename});
      const frontMatter = parseFrontmatter(contents).data;
      const slug = filename.split('/').slice(-2)[0];

      return {
        html: parsed.contents,
        slug,
        ...frontMatter,
      };
    }),
  );
  const sortedPosts = posts.sort((a, b) =>
    new Date(a.datePublished) < new Date(b.datePublished) ? 1 : -1,
  );

  return sortedPosts;
}

export {getArticles};
