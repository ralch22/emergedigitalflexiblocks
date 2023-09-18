module.exports = async (
  { actions },
  pluginOptions,
  { template }
) => {
  const { createPage } = actions

  createPage({
    path: "/dashboard/orders",
    component: template,
  })
}
