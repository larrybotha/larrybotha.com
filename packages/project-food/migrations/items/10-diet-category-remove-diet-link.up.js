const migrationFn = async (migration, {makeRequest}) => {
  const dietCategoryName = 'dietCategory';
  const dietCategoryContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=${dietCategoryName}`,
  });

  if (dietCategoryContentType) {
    const dietCategory = migration.editContentType(dietCategoryName);

    dietCategory.deleteField('diet');
  }
};

module.exports = migrationFn;
