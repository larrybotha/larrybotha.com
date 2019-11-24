const migrationFn = async (migration, {makeRequest}) => {
  const foodGroupContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=foodGroup`,
  });
  const firstEntity = foodGroupContentType.items.find(Boolean);

  if (firstEntity) {
    migration.deleteContentType('foodGroup');
  }
};

module.exports = migrationFn;
