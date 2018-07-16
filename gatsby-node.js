const path = require('path');

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;

  return new Promise((resolve, reject) => {
    const article = path.resolve('./src/templates/Article.tsx');
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
            path: `/articles/${post.node.slug}/`,
            component: article,
            context: {
              slug: post.node.slug,
            },
          });
        });
      }),
    );
  });
};
