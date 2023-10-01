exports.createSchemaCustomization = require('./src/createSchemaCustomization')

exports.onCreateNode = require('./src/onCreateNode')

exports.createPages = require('./src/createPages')

exports.onCreatePage = require('./src/onCreatePage')

const path = require('path')
const fetch = require('node-fetch')
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default

// Configure the WooCommerce API instance
let WooCommerce = new WooCommerceRestApi({
  url: 'https://emergedigital.ae/',
  consumerKey: 'ck_df4765e80f8d16e1567094ebae468b6e817acb5f',
  consumerSecret: 'cs_fff806cc2fe197879ba20245ffc7e8d630219766',
  version: 'wc/v3' // Adjust the API version as needed
})

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  // Fetch custom post data from WordPress REST API
  const response = await fetch(
    'https://emergedigital.ae/wp-json/wp/v2/case-studies'
  )
  const postData = await response.json()

  // Load the SinglePost template
  // const postTemplate = path.resolve('./src/templates/case.js');

  // Create individual pages for each custom post
  postData.forEach(post => {
    createPage({
      path: `/cases/${post.slug}`,
      component: require.resolve('./src/templates/case'),
      context: {
        post
      }
    })
  })
}

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  // Fetch custom post data from WordPress REST API
  const response = await WooCommerce.get('products')
  const postData = await response.data

  // Load the SinglePost template
  // const postTemplate = path.resolve('./src/templates/case.js');

  // Create individual pages for each custom post
  postData.forEach(post => {
    createPage({
      path: `/products/${post.slug}`,
      component: require.resolve('./src/templates/product'),
      context: {
        post
      }
    })
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@tap-payments\/gosell/,
            use: loaders.null()
          }
        ]
      }
    })
  }
}
