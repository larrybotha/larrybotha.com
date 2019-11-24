const migrationFn = async (migration, {makeRequest}) => {
  const colorGroupName = 'colorGroup';
  const colorGroupContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=${colorGroupName}`,
  });

  if (colorGroupContentType.items.length === 0) {
    migration
      .createContentType(colorGroupName)
      .name('Colour Group')
      .description(`Colour group any particular food belongs to.`);

    migration
      .editContentType(colorGroupName)
      .createField('title')
      .name('Title')
      .type('Symbol');

    migration.editContentType(colorGroupName).displayField('title');

    migration
      .editContentType(colorGroupName)
      .createField('productCategories')
      .name('Categories')
      .type('Array')
      .items({
        type: 'Link',
        linkType: 'Entry',
        validations: [{linkContentType: ['productCategory']}],
      });
  }
};

module.exports = migrationFn;
