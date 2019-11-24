const migrationFn = async (migration, {makeRequest}) => {
  const foodGroupName = 'foodGroup';
  const foodGroupContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=${foodGroupName}`,
  });

  if (foodGroupContentType.items.length === 0) {
    const foodGroup = migration.createContentType(foodGroupName);

    foodGroup.name('Food Group').description(`Food group any particular food belongs to`);

    foodGroup
      .createField('title')
      .name('Title')
      .type('Symbol');

    foodGroup.displayField('title');

    foodGroup
      .createField('slug')
      .name('Slug')
      .type('Symbol')
      .required(true)
      .validations([{unique: true}]);

    foodGroup.changeFieldControl('slug', 'builtin', 'slugEditor');
  }
};

module.exports = migrationFn;
