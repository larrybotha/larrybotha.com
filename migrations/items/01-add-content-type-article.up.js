const migrationFn = async (migration, {makeRequest}) => {
  const articleName = 'article';
  const articleContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=${articleName}`,
  });

  if (articleContentType.items.length === 0) {
    const article = migration.createContentType(articleName);

    article.name('Article').description(`An article entity`);

    article
      .createField('title')
      .name('Title')
      .type('Symbol');

    article.displayField('title');

    article
      .createField('slug')
      .name('Slug')
      .type('Symbol')
      .required(true)
      .validations([{unique: true}]);

    article
      .createField('datePublished')
      .name('Date published')
      .type('Date')
      .required(true);

    article.changeFieldControl('slug', 'builtin', 'slugEditor');

    article
      .createField('bannerImage')
      .name('Banner image')
      .type('Link')
      .linkType('Asset')
      .validations([
        {
          linkMimetypeGroup: ['image'],
        },
      ]);

    article
      .createField('body')
      .name('Body')
      .type('Text')
      .required(true);
  }
};

module.exports = migrationFn;
