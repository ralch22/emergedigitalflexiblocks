const getValue = require('get-value');
const typesDefs = require('../types');

module.exports = pluginOptions => {
  const services = {
    algolia: getValue(pluginOptions, 'services.algolia', true),
    mailchimp: getValue(pluginOptions, 'services.mailchimp', false),
    disqus: getValue(pluginOptions, 'services.disqus', true),
    graphComment: getValue(pluginOptions, 'services.graphComment', false),
    facebookComment: getValue(pluginOptions, 'services.facebookComment', false),
  };

  const sources = [
    {
      name: 'contentful',
      enabled: getValue(pluginOptions, 'sources.contentful', false),
      sourcePlugin: 'gatsby-source-contentful',
      imageNodeType: 'ContentfulAsset',
      typeDefs: typesDefs.contentful,
      typeDefsFallback: typesDefs.contentfulFallback,
    },
    {
      name: 'sanity',
      enabled: getValue(pluginOptions, 'sources.sanity', false),
      sourcePlugin: 'gatsby-source-sanity',
      imageNodeType: 'SanityImageAsset',
      typeDefs: typesDefs.sanity,
      typeDefsFallback: typesDefs.sanityFallback,
    },
    {
      name: 'strapi',
      enabled: getValue(pluginOptions, 'sources.strapi', false),
      sourcePlugin: 'gatsby-source-strapi',
      sourcePluginVersion: '2.0.0',
      sourcePluginUpgradeDocs:
        'https://elegantstack.netlify.app/flexiblog/sourcing-data/strapi-cms/#migrating-from-strapi-v3-to-v4',
      imageNodeType: 'ImageSharp',
      typeDefs: typesDefs.strapi,
    },
  ];

  const siteUrl = pluginOptions.siteUrl
    ? pluginOptions.siteUrl.replace(/\/$/, '')
    : null;

  const basePath = pluginOptions.basePath || '/';

  const localPaths = [
    {
      name: 'article',
      path: getValue(pluginOptions, 'localPaths.post', 'content/posts'),
    },
    {
      name: 'author',
      path: getValue(pluginOptions, 'localPaths.author', 'content/authors'),
    },
    {
      name: 'category',
      path: getValue(
        pluginOptions,
        'localPaths.category',
        'content/categories',
      ),
    },
    {
      name: 'block',
      path: getValue(pluginOptions, 'localPaths.block', 'content/blocks'),
    },
  ];

  const staticPaths = [
    {
      name: 'asset',
      path: getValue(pluginOptions, 'localPaths.asset', 'content/assets'),
    },
  ];

  const sitePaths = {
    SanityArticleProxy: getValue(pluginOptions, 'sitePaths.article', ''),
    ContentfulArticleProxy: getValue(pluginOptions, 'sitePaths.article', ''),
    StrapiArticleProxy: getValue(pluginOptions, 'sitePaths.article', ''),
    AuthorsJson: getValue(pluginOptions, 'sitePaths.author', '/author'),
    SanityAuthorProxy: getValue(pluginOptions, 'sitePaths.author', '/author'),
    ContentfulAuthorProxy: getValue(
      pluginOptions,
      'sitePaths.author',
      '/author',
    ),
    StrapiAuthorProxy: getValue(pluginOptions, 'sitePaths.author', '/author'),
    ArticleTag: getValue(pluginOptions, 'sitePaths.tag', '/tag'),
    CategoriesJson: getValue(pluginOptions, 'sitePaths.category', '/category'),
    SanityCategoryProxy: getValue(
      pluginOptions,
      'sitePaths.category',
      '/category',
    ),
    ContentfulCategoryProxy: getValue(
      pluginOptions,
      'sitePaths.category',
      '/category',
    ),
    StrapiCategoryProxy: getValue(
      pluginOptions,
      'sitePaths.category',
      '/category',
    ),
  };

  const pagingParam = pluginOptions.pagingParam || 'page';
  const paginatePostsPage = pluginOptions.paginatePostsPage || true;
  const homePostsPerPage = pluginOptions.homePostsPerPage || 6;
  const collectionPostsPerPage = pluginOptions.collectionPostsPerPage || 6;

  const mobileMenu = null; // Will populate by: utils/queryMobileMenu.js

  const darkMode = getValue(pluginOptions, 'darkMode', true);

  const slugSanitizeRegex = getValue(pluginOptions, 'slugSanitizeRegex', null);

  const includeExcerpt = getValue(pluginOptions, 'includeExcerpt', true);
  const includeTimeToRead = getValue(pluginOptions, 'includeTimeToRead', true);
  const includeTableOfContents = getValue(
    pluginOptions,
    'includeTableOfContents',
    true,
  );
  const imageQuality = getValue(pluginOptions, 'imageQuality', 75);

  const gatsbyRemarkPlugins = getValue(
    pluginOptions,
    'gatsbyRemarkPlugins',
    [],
  );
  const remarkPlugins = getValue(pluginOptions, 'remarkPlugins', []);

  const createDemoPages = getValue(pluginOptions, 'createDemoPages', true);
  const colorMode = getValue(pluginOptions, 'colorMode', true);

  const isDevelopment = process?.env?.NODE_ENV === 'development';

  const pageContextOptions = {
    paginatePostsPage,
    basePath,
    services,
    siteUrl,
    mobileMenu,
    darkMode,
    includeExcerpt,
    includeTimeToRead,
    includeTableOfContents,
    imageQuality,
    createDemoPages,
    colorMode,
    isDevelopment,
  };

  return {
    services,
    sources,
    siteUrl,
    basePath,
    localPaths,
    staticPaths,
    sitePaths,
    pagingParam,
    homePostsPerPage,
    paginatePostsPage,
    collectionPostsPerPage,
    slugSanitizeRegex,
    pageContextOptions,
    gatsbyRemarkPlugins,
    remarkPlugins,
    pageContextOptions,
  };
};
