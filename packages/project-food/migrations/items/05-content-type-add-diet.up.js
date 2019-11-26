const migrationFn = async (migration, {makeRequest}) => {
  const dietName = 'diet';
  const dietContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=${dietName}`,
  });

  if (dietContentType.items.length === 0) {
    const diet = migration.createContentType(dietName);

    diet.name('Diet');

    diet
      .createField('title')
      .name('Title')
      .type('Symbol');

    diet.displayField('title');

    diet
      .createField('slug')
      .type('Symbol')
      .required(true)
      .name('Slug')
      .validations([{unique: true}]);

    diet.changeFieldControl('slug', 'builtin', 'slugEditor');
  }
};

module.exports = migrationFn;
