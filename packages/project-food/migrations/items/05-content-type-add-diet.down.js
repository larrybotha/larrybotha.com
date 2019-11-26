const migrationFn = async (migration, {makeRequest}) => {
  const dietContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=diet`,
  });
  const firstEntity = dietContentType.items.find(Boolean);

  if (firstEntity) {
    migration.deleteContentType('diet');
  }
};

module.exports = migrationFn;
