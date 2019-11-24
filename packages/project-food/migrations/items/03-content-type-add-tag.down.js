const migrationFn = async (migration, {makeRequest}) => {
  const tagContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=tag`,
  });
  const firstEntity = tagContentType.items.find(Boolean);

  if (firstEntity) {
    migration.deleteContentType('tag');
  }
};

module.exports = migrationFn;
