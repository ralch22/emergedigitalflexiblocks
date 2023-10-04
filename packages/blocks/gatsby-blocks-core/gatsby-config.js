require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const l = require('lodash');
const path = require('path');
const withDefaults = require('./src/utils/default.options');

const siteUrl = process.env.URL || `https://fallback.net`;

module.exports = options => {
  options = withDefaults(options);

  const plugins = [
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
          allWpContentNode(filter: {nodeType: {in: ["Post", "Page"]}}) {
            nodes {
              ... on WpPost {
                uri
                modifiedGmt
              }
              ... on WpPage {
                uri
                modifiedGmt
              }
            }
          }
        }
      `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allWpContentNode: { nodes: allWpNodes },
        }) => {
          const wpNodeMap = allWpNodes.reduce((acc, node) => {
            const { uri } = node;
            acc[uri] = node;

            return acc;
          }, {});

          return allPages.map(page => {
            return { ...page, ...wpNodeMap[page.path] };
          });
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          };
        },
      },
    },
    {
      resolve: '@elegantstack/gatsby-plugin-proxy-directives',
      options,
    },
    {
      resolve: '@elegantstack/gatsby-plugin-proxy-schema',
      options,
    },
    {
      resolve: '@elegantstack/gatsby-plugin-utility-directives',
      options,
    },
    {
      resolve: '@elegantstack/gatsby-plugin-mkdir',
      options,
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `emerge-digital`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Emerge Digital',
        short_name: 'Emerge Digital',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/icon.png', // Specify the path to your favicon image
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-image',
    'gatsby-plugin-next-seo',
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
          'contentNodes',
          'seo',
          'ancestors',
          'author',
          'template',
          'lastEditedBy',
          'authorDatabaseId',
          'authorId',
          'contentTypeName',
          'dateGmt',
          'desiredSlug',
          'enclosure',
          'isContentNode',
          'isTermNode',
          'modified',
          'modifiedGmt',
          'parentDatabaseId',
          'parentId',
          'srcSet',
          'parent',
          'children',
        ],
        html: {
          useGatsbyImage: true,
        },
      },
    },
    {
      resolve: 'gatsby-transformer-sharp',
      options: {
        checkSupportedExtensions: false,
      },
    },
  ].filter(Boolean);

  // Resolve local paths
  plugins.push({
    resolve: 'gatsby-transformer-json',
    options: {
      typeName: ({ node }) =>
        node.sourceInstanceName === 'block'
          ? 'BlockContent'
          : l.upperFirst(l.camelCase(`${path.basename(node.dir)} Json`)),
    },
  });

  options.localPaths.forEach(localPath =>
    plugins.push({
      resolve: 'gatsby-source-filesystem',
      options: localPath,
    }),
  );

  // Resolve static paths (ie. assets)
  options.staticPaths.forEach(localPath =>
    plugins.push({
      resolve: 'gatsby-source-filesystem',
      options: localPath,
    }),
  );

  return {
    plugins,
  };
};
