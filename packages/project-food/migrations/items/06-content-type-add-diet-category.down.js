const migrationFn = async (migration, {makeRequest}) => {
  const dietCategoryContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=dietCategory`,
  });
  const firstEntity = dietCategoryContentType.items.find(Boolean);

  if (firstEntity) {
    migration.deleteContentType('dietCategory');
  }
};

module.exports = migrationFn;
