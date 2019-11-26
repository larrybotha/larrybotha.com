const migrationFn = async (migration, {makeRequest}) => {
  const dietCategoryName = 'dietCategory';
  const dietCategoryContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=${dietCategoryName}`,
  });

  if (dietCategoryContentType.items.length === 0) {
    const dietCategory = migration.createContentType(dietCategoryName);

    dietCategory.name('Diet Category');

    dietCategory
      .createField('adminTitle')
      .name('Admin Title')
      .type('Symbol');

    dietCategory.displayField('adminTitle');

    dietCategory
      .createField('title')
      .name('Title')
      .type('Symbol');

    dietCategory
      .createField('slug')
      .type('Symbol')
      .required(true)
      .name('Slug')
      .validations([{unique: true}]);

    dietCategory.changeFieldControl('slug', 'builtin', 'slugEditor');

    dietCategory
      .createField('diet')
      .name('Diet')
      .type('Link')
      .linkType('Entry')
      .validations([{linkContentType: ['diet']}])
      .required(true);

    dietCategory
      .createField('foodItems')
      .name('Foods')
      .type('Array')
      .items({
        type: 'Link',
        linkType: 'Entry',
        validations: [{linkContentType: ['foodItem']}],
      });
  }
};

module.exports = migrationFn;
