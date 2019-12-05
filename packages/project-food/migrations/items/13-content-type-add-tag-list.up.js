const migrationFn = async (migration, {makeRequest}) => {
  const tagListName = 'tagList';
  const tagListContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=${tagListName}`,
  });

  if (tagListContentType.items.length === 0) {
    const tagList = migration.createContentType(tagListName);

    tagList.name('Tag List').description(`List of tags to specify order`);

    tagList
      .createField('title')
      .name('Title')
      .type('Symbol');

    tagList.displayField('title');

    tagList
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
