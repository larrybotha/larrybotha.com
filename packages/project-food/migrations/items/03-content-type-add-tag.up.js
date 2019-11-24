const migrationFn = async (migration, {makeRequest}) => {
  const tagName = 'tag';
  const tagContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=${tagName}`,
  });

  if (tagContentType.items.length === 0) {
    const tag = migration.createContentType(tagName);

    tag.name('Tag').description(`Metadata associated with any specific food item`);

    tag
      .createField('title')
      .name('Title')
      .type('Symbol');

    tag.displayField('title');

    tag
      .createField('abbreviation')
      .name('Abbreviation')
      .type('Symbol')
      .required(true);

    tag
      .createField('description')
      .name('Description')
      .type('Text');
  }
};

module.exports = migrationFn;
