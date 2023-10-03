const urljoin = require('url-join');
const normalizeSlug = require('../utils/normalizeSlug');
const fetch = require('node-fetch');

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

  // Fetch custom post data from WordPress REST API
  const response = await fetch(
    'https://emergedigital.ae/wp-json/wp/v2/case-studies',
  );
  const postData = await response.json();

  // Load the SinglePost template
  // const postTemplate = path.resolve('./src/templates/case.js');

  // Create individual pages for each custom post
  postData.forEach(post => {
    createPage({
      path: `/cases/${post.slug}`,
      component: template,
      context: {
        post,
      },
    });
  });
};
