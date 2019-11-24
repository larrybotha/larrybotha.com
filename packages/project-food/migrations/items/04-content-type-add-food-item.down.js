const migrationFn = async (migration, {makeRequest}) => {
  const foodItemContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=foodItem`,
  });
  const firstEntity = foodItemContentType.items.find(Boolean);

  if (firstEntity) {
    migration.deleteContentType('foodItem');
  }
};

module.exports = migrationFn;
