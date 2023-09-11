require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})


const l = require('lodash')
const path = require('path')
const withDefaults = require('./src/utils/default.options')

module.exports = options => {
  options = withDefaults(options)
  
  const plugins = [
    {
      resolve: '@elegantstack/gatsby-plugin-proxy-directives',
      options
    },
    {
      resolve: '@elegantstack/gatsby-plugin-proxy-schema',
      options
    },
    {
      resolve: '@elegantstack/gatsby-plugin-utility-directives',
      options
    },
    {
      resolve: '@elegantstack/gatsby-plugin-mkdir',
      options
    },
    { 
      resolve: `gatsby-plugin-disqus`, 
      options: { 
        shortname: `emerge-digital` 
      } 
    }, 
    'gatsby-plugin-catch-links',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-fastify`,
      options: {
        /* discussed below */
      }, // All options are optional
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://emergedigital.ae/graphql`,
        restApiRoutePrefix: `wp-json`,
        production: {
          allow401Images: true,
          allow404Images: true,
        },
        excludeFieldNames: [
          "contentNodes",
          "seo",
          "ancestors",
          "author",
          "template",
          "lastEditedBy",
          "authorDatabaseId",
          "authorId",
          "contentTypeName",
          "dateGmt",
          "desiredSlug",
          "enclosure",
          "isContentNode",
          "isTermNode",
          "modified",
          "modifiedGmt",
          "parentDatabaseId",
          "parentId",
          "srcSet",
          "parent",
          "children"
        ],
        html: {
          useGatsbyImage: true,
        },
      },
    },
    {
      resolve: 'gatsby-transformer-sharp',
      options: {
        checkSupportedExtensions: false
      }
    }
  ].filter(Boolean)

  // Resolve local paths
  plugins.push({
    resolve: 'gatsby-transformer-json',
    options: {
      typeName: ({ node }) =>
        node.sourceInstanceName === 'block'
          ? 'BlockContent'
          : l.upperFirst(l.camelCase(`${path.basename(node.dir)} Json`))
    }
  })

  options.localPaths.forEach(localPath =>
    plugins.push({
      resolve: 'gatsby-source-filesystem',
      options: localPath
    })
  )

  // Resolve static paths (ie. assets)
  options.staticPaths.forEach(localPath =>
    plugins.push({
      resolve: 'gatsby-source-filesystem',
      options: localPath
    })
  )

  return {
    plugins
  }
}
