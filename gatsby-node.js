const path = require('path');

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions;

  return new Promise((resolve, reject) => {
    const article = path.resolve('./src/templates/article.tsx');

    resolve(
      graphql(
        `
          {
            allContentfulArticle {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);

          reject(result.errors);
        }

        const posts = result.data.allContentfulArticle.edges;

        posts.forEach((post, index) => {
          createPage({
            component: article,
            context: {slug: post.node.slug},
            path: `/articles/${post.node.slug}/`,
          });
        });
      }),
    );
  });
};
