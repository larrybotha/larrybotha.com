const migrationFn = async (migration, {makeRequest}) => {
  const dietName = 'diet';
  const dietContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=${dietName}`,
  });

  if (dietContentType) {
    const diet = migration.editContentType(dietName);

    diet
      .createField('dietCategories')
      .name('Diet Categories')
      .type('Array')
      .items({
        type: 'Link',
        linkType: 'Entry',
        validations: [{linkContentType: ['dietCategory']}],
      });
  }
};

module.exports = migrationFn;
