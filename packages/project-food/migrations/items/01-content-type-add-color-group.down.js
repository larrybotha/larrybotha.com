const migrationFn = async (migration, {makeRequest}) => {
  const colorGroupContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=colorGroup`,
  });
  const firstEntity = colorGroupContentType.items.find(Boolean);

  if (firstEntity) {
    migration.deleteContentType('colorGroup');
  }
};

module.exports = migrationFn;
