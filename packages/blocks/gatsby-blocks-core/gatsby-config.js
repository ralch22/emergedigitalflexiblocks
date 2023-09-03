const _ = require('lodash')
const path = require('path')
const withDefaults = require('./src/utils/default.options')

module.exports = options => {
  options = withDefaults(options)
  const mdxSource = options.sources.find(source => source.name == 'mdx')
  const mdxExtensions = mdxSource && mdxSource.extensions
  
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
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: mdxExtensions,
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: options.imageQuality,
              showCaptions: true,
              linkImagesToOriginal: false,
              disableBgImageOnAlpha: true
            }
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 800
            }
          },
          { resolve: 'gatsby-remark-responsive-iframe' },
          { resolve: 'gatsby-remark-copy-linked-files' },
          { resolve: 'gatsby-remark-smartypants' },
          ...options.gatsbyRemarkPlugins
        ],
        remarkPlugins: [require('remark-slug'), ...options.remarkPlugins]
      }
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://emergedigital.ae/graphql`,
        restApiRoutePrefix: `wp-json`,
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
          : _.upperFirst(_.camelCase(`${path.basename(node.dir)} Json`))
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
