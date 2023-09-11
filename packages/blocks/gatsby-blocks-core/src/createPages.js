const withDefaults = require('./utils/default.options')
const createPostsPage = require('./pages/_posts')
const createUserPage = require('./pages/_user')
const createPostPage = require('./pages/_post')
const createCollectionPage = require('./pages/_collection')

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

  /**
   * Category posts pages
   */
  await createCollectionPage(helpers, pluginOptions, {
    template: require.resolve('./templates/collection.category'),
    slugField: '{category: {slug: SELECT}}'
  })

  /**
   * Tag posts pages
   */
  await createCollectionPage(helpers, pluginOptions, {
    template: require.resolve('./templates/collection.tag'),
    slugField: '{tags: {slug: SELECT}}'
  })

  /**
   * Author posts pages
   */
  await createCollectionPage(helpers, pluginOptions, {
    template: require.resolve('./templates/collection.author'),
    slugField: '{author: {slug: SELECT}}'
  })
}
