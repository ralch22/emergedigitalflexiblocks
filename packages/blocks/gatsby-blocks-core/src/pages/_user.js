const urljoin = require('url-join');
const normalizeSlug = require('../utils/normalizeSlug');

module.exports = async (
  { graphql, actions, reporter },
  pluginOptions,
  { template },
) => {
  const { createPage } = actions;
  const {
    basePath,
    paginatePostsPage,
    homePostsPerPage,
    pagingParam,
    pageContextOptions,
  } = pluginOptions;

  createPage({
    path: '/dashboard',
    component: template,
  });
};
