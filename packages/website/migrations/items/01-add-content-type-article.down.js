const migrationFn = async (migration, {makeRequest}) => {
  const articleContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=article`,
  });
  const firstEntity = articleContentType.items.find(Boolean);

  if (firstEntity) {
    migration.deleteContentType('article');
  }
};

module.exports = migrationFn;
