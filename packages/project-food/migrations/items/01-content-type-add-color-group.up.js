const migrationFn = async (migration, {makeRequest}) => {
  const colorGroupName = 'colorGroup';
  const colorGroupContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=${colorGroupName}`,
  });

  if (colorGroupContentType.items.length === 0) {
    const colorGroup = migration.createContentType(colorGroupName);

    colorGroup.name('Colour Group').description(`Colour group any particular food belongs to.`);

    colorGroup
      .createField('title')
      .name('Title')
      .type('Symbol');

    colorGroup.displayField('title');

    colorGroup
      .createField('slug')
      .name('Slug')
      .type('Symbol')
      .required(true)
      .validations([{unique: true}]);

    colorGroup.changeFieldControl('slug', 'builtin', 'slugEditor');

    colorGroup
      .createField('description')
      .name('Description')
      .type('Text');
  }
};

module.exports = migrationFn;
