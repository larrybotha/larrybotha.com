const migrationFn = async (migration, {makeRequest}) => {
  const tagName = 'tag';
  const tagContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=${tagName}`,
  });

  if (tagContentType) {
    const tag = migration.editContentType(tagName);

    tag
      .createField('slug')
      .name('Slug')
      .type('Symbol')
      .required(true)
      .validations([{unique: true}]);

    tag.changeFieldControl('slug', 'builtin', 'slugEditor');
  }
};

module.exports = migrationFn;
