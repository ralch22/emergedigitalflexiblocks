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



  //Create pagination for posts page if is required
  if (paginatePostsPage) {
    const result = await graphql(`
			{
				allWpPost(
          limit: ${homePostsPerPage}
        ) {
					pageInfo {
						pageCount
					}
				}
			}
		`)

    if (result.errors) {
      reporter.panic(result.errors)
    }

    const { pageInfo } = result.data.allWpPost

    Array.from({ length: pageInfo.pageCount }, (_, i) => {
      let path = i === 0 ? basePath : urljoin(basePath, pagingParam, `${i + 1}`)
      path = normalizeSlug(path)

      createPage({
        path: "/posts",
        component: template,
        context: {
          limit: homePostsPerPage,
          skip: i * homePostsPerPage,
          ...pageContextOptions
        }
      })
    })
    // Single posts page without pagination
  } else {
    createPage({
      path: "/posts",
      component: template,
      context: {
        ...pageContextOptions
      }
    })
  }
}
