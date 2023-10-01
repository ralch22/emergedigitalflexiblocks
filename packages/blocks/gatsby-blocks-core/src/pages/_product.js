const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default

const WooCommerce = new WooCommerceRestApi({
  url: 'https://emergedigital.ae/',
  consumerKey: 'ck_df4765e80f8d16e1567094ebae468b6e817acb5f',
  consumerSecret: 'cs_fff806cc2fe197879ba20245ffc7e8d630219766',
  version: 'wc/v3' // Adjust the API version as needed
})

module.exports = async ({ actions }, pluginOptions, { template }) => {
  const { createPage } = actions
  const { pageContextOptions } = pluginOptions

  const response = await WooCommerce.get('products')

  response.data.forEach(post => {
    createPage({
      path: `/products/${post.slug}`,
      component: template,
      context: {
        post
      }
    })
  })
}
