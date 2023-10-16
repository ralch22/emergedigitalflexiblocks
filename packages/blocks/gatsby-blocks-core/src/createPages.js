const withDefaults = require('./utils/default.options');
const createPostsPage = require('./pages/_posts');
const createUserPage = require('./pages/_user');
const createPostPage = require('./pages/_post');
const createCasePage = require('./pages/_case');
const createAuthorPage = require('./pages/_author');
const createProductPage = require('./pages/_product');
const createCategoryPage = require('./pages/_category');
module.exports = async (helpers, pluginOptions) => {
  pluginOptions = withDefaults(pluginOptions);

  /**
   * Posts (home) page
   */
  await createPostsPage(helpers, pluginOptions, {
    template: require.resolve('./templates/posts'),
  });

  await createCasePage(helpers, pluginOptions, {
    template: require.resolve('./templates/case'),
  });

  await createAuthorPage(helpers, pluginOptions, {
    template: require.resolve('./templates/author'),
  });

  await createProductPage(helpers, pluginOptions, {
    template: require.resolve('./templates/product'),
  });

  await createCategoryPage(helpers, pluginOptions, {
    template: require.resolve('./templates/category'),
  });

  /**
   * Posts (home) page
   */
  await createUserPage(helpers, pluginOptions, {
    template: require.resolve('./templates/user'),
  });

  /**
   * Single post pages
   */
  await createPostPage(helpers, pluginOptions, {
    template: require.resolve('./templates/post'),
  });
};
