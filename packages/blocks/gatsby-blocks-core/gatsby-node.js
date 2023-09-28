exports.createSchemaCustomization = require('./src/createSchemaCustomization')

exports.onCreateNode = require('./src/onCreateNode')

exports.createPages = require('./src/createPages')

exports.onCreatePage = require('./src/onCreatePage')

const path = require('path');
const fetch = require('node-fetch');

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  // Fetch custom post data from WordPress REST API
  const response = await fetch('https://emergedigital.ae/wp-json/wp/v2/case-studies');
  const postData = await response.json();

  // Load the SinglePost template
  // const postTemplate = path.resolve('./src/templates/case.js');

  // Create individual pages for each custom post
  postData.forEach(post => {
    createPage({
      path: `/cases/${post.slug}`,
      component: require.resolve('./src/templates/case'),
      context: {
        post,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /@tap-payments\/gosell/,
              use: loaders.null(),
            },
          ],
        },
      })
    }
  }
  

