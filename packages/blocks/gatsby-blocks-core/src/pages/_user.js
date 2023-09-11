const urljoin = require('url-join')
const normalizeSlug = require('../utils/normalizeSlug')
const queryMobileMenu = require('../utils/queryMobileMenu')

module.exports = async (
  { graphql, actions, reporter },
  pluginOptions,
  { template }
) => {
  const { createPage } = actions
  const {
    basePath,
    paginatePostsPage,
    homePostsPerPage,
    pagingParam,
    pageContextOptions
  } = pluginOptions

  pageContextOptions.mobileMenu = await queryMobileMenu({ graphql })

  createPage({
    path: "/dashboard",
    component: template,
  })
}
