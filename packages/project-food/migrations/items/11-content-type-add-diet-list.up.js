const migrationFn = async (migration, {makeRequest}) => {
  const dietListName = 'dietList';
  const dietListContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=${dietListName}`,
  });

  if (dietListContentType.items.length === 0) {
    const dietList = migration.createContentType(dietListName);

    dietList.name('Diet List').description(`List of diets to specify order`);

    dietList
      .createField('title')
      .name('Title')
      .type('Symbol');

    dietList.displayField('title');

    dietList
      .createField('diets')
      .name('Diets')
      .type('Array')
      .items({
        type: 'Link',
        linkType: 'Entry',
        validations: [{linkContentType: ['diet']}],
      });
  }
};

module.exports = migrationFn;
