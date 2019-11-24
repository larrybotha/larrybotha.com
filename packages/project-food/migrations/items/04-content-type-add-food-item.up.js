const migrationFn = async (migration, {makeRequest}) => {
  const foodItemName = 'foodItem';
  const foodItemContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=${foodItemName}`,
  });

  if (foodItemContentType.items.length === 0) {
    const foodItem = migration.createContentType(foodItemName);

    foodItem.name('Food Item').description(`Yummy foodItem`);

    foodItem
      .createField('title')
      .name('Title')
      .type('Symbol');

    foodItem.displayField('title');

    foodItem
      .createField('slug')
      .type('Symbol')
      .required(true)
      .name('Slug')
      .validations([{unique: true}]);

    foodItem.changeFieldControl('slug', 'builtin', 'slugEditor');

    foodItem
      .createField('foodGroup')
      .name('Food Group')
      .type('Link')
      .linkType('Entry')
      .validations([{linkContentType: ['foodGroup']}])
      .required(true);

    foodItem
      .createField('colorGroup')
      .name('Colour Group')
      .type('Link')
      .linkType('Entry')
      .validations([{linkContentType: ['colorGroup']}])
      .required(true);

    foodItem
      .createField('tags')
      .name('Tags')
      .type('Array')
      .items({
        type: 'Link',
        linkType: 'Entry',
        validations: [{linkContentType: ['tag']}],
      });
  }
};

module.exports = migrationFn;
