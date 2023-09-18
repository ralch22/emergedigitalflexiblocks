module.exports = async (
  { actions },
  pluginOptions,
  { template }
) => {
  const { createPage } = actions
  const {
    pageContextOptions
  } = pluginOptions

    createPage({
      path: "/products",
      component: template,
      context: {
        ...pageContextOptions
      }
    })
}
