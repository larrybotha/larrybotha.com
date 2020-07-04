module.exports = {
  'src/routes/{blog,notes}/*/index.svx': [
    fileNames =>
      `node ./scripts/write-frontmatter-dates ${fileNames.join(' ')}`,
  ],
};
