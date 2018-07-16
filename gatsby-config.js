require('dotenv').config();

const isProd = process.env.NODE_ENV !== 'development';

const contentfulOptions = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env[`CONTENTFUL_ACCESS_TOKEN${isProd ? '' : '_PREVIEW'}`],
  host: isProd ? undefined : 'preview.contentful.com',
};

module.exports = {
  siteMetadata: {
    title: `Gatsby Typescript Starter`,
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {...contentfulOptions},
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: [`${__dirname}/node_modules/normalize.css`],
      },
    },
  ],
};
