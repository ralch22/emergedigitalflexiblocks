require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})


module.exports = options => {
  const { createDemoPages } = options

  const plugins = [
    {
      resolve: '@elegantstack/gatsby-blocks-core',
      options
    },
    {
      resolve: `gatsby-plugin-fastify`,
      options: {
        /* discussed below */
      }, // All options are optional
    }, 
    
    '@elegantstack/gatsby-blocks-helpers',
    '@elegantstack/gatsby-common-helpers',
    {
      resolve: '@elegantstack/solid-ui-theme',
      options
    },
    '@elegantstack/solid-ui-layout',
    '@elegantstack/solid-ui-components',
    '@elegantstack/solid-ui-blocks',
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_SEARCH_KEY,
        queries: require("../../blocks/gatsby-blog-algolia/src/queries"),
      },
    }
  ]

  if (createDemoPages === true) {
    plugins.push({
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `${__dirname}/src`
      }
    })
  }

  return { plugins }
}
