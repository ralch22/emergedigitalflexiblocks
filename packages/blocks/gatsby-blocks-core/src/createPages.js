const withDefaults = require('./utils/default.options')
const createPostsPage = require('./pages/_posts')
const createUserPage = require('./pages/_user')
const createPostPage = require('./pages/_post')

module.exports = async (helpers, pluginOptions) => {
  pluginOptions = withDefaults(pluginOptions)

  /**
   * Posts (home) page
   */
  await createPostsPage(helpers, pluginOptions, {
    template: require.resolve('./templates/posts')
  })
  
   /**
   * Posts (home) page
   */
   await createUserPage(helpers, pluginOptions, {
    template: require.resolve('./templates/user')
  })
  

  /**
   * Single post pages
   */
  await createPostPage(helpers, pluginOptions, {
    template: require.resolve('./templates/post')
  })
}
