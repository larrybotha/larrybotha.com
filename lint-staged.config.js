module.exports = {
  'src/routes/{blog,notes}/*/index.{svx,md}': [
    (fileNames) =>
      `node ./scripts/write-frontmatter-dates ${fileNames.join(' ')}`,
  ],
};
