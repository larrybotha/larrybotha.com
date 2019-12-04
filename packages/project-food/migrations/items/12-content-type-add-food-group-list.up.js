const migrationFn = async (migration, {makeRequest}) => {
  const foodGroupListName = 'foodGroupList';
  const foodGroupListContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=${foodGroupListName}`,
  });

  if (foodGroupListContentType.items.length === 0) {
    const foodGroupList = migration.createContentType(foodGroupListName);

    foodGroupList.name('Food Group List').description(`List of food groups to specify order`);

    foodGroupList
      .createField('title')
      .name('Title')
      .type('Symbol');

    foodGroupList.displayField('title');

    foodGroupList
      .createField('foodGroups')
      .name('Food Groups')
      .type('Array')
      .items({
        type: 'Link',
        linkType: 'Entry',
        validations: [{linkContentType: ['foodGroup']}],
      });
  }
};

module.exports = migrationFn;
