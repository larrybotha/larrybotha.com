module.exports = {
  'src/routes/blog/*/index.svx': ['node ./scripts/write-frontmatter-dates'],
  'src/routes/notes/*/index.svx': ['node ./scripts/write-frontmatter-dates'],
};
