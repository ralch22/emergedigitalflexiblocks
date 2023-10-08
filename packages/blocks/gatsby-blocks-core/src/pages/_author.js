module.exports = async (
  { graphql, actions, reporter },
  pluginOptions,
  { template },
) => {
  const { createPage } = actions;
  const { pageContextOptions } = pluginOptions;

  const result = await graphql(`
    {
      allWpUser {
        nodes {
          id
          slug
          avatar {
            url
          }
          description
          name
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(result.errors);
  }

  const authors = result.data.allWpUser.nodes;

  authors.forEach(author => {
    const { id, slug } = author;

    createPage({
      path: `/author/${slug}`,
      component: template,
      context: {
        id,
        ...pageContextOptions,
      },
    });
  });
};
