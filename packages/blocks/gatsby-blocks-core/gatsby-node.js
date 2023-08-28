exports.createSchemaCustomization = require('./src/createSchemaCustomization')

exports.onCreatePage = require('./src/onCreatePage')

const path = require('path');
const fetch = require('node-fetch');

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  // Fetch custom post data from WordPress REST API
  const response = await fetch('https://emergedigital.ae/wp-json/wp/v2/case-studies');
  const postData = await response.json();

  // Load the SinglePost template
  const postTemplate = path.resolve('./templates/case-template.js');

  // Create individual pages for each custom post
  postData.forEach(post => {
    createPage({
      path: `/cases/${post.slug}`,
      component: postTemplate,
      context: {
        post,
      },
    });
  });
};

