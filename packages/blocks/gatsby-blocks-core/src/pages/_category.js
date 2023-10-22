module.exports = async (
  { graphql, actions, reporter },
  pluginOptions,
  { template },
) => {
  const { createPage } = actions;
  const { pageContextOptions } = pluginOptions;

  const result = await graphql(`
    {
      allWpCategory {
        nodes {
          name
          slug
          link
          description
          id
          posts {
            nodes {
              id
              title
              slug
              date(formatString: "MMMM DD, YYYY")
              excerpt
              featuredImage {
                node {
                  altText
                  id
                  sourceUrl
                }
              }
              categories {
                nodes {
                  id
                  name
                }
              }
              tags {
                nodes {
                  name
                  id
                }
              }
              author {
                node {
                  id
                  slug
                  avatar {
                    url
                  }
                  name
                }
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(result.errors);
  }

  const { allWpCategory } = result.data;
  const category = allWpCategory.nodes;
  category.forEach(({ id, slug, posts }, index) => {
    createPage({
      path: `/category/${slug}`,
      component: template,
      context: {
        id,
        posts,
        ...pageContextOptions,
      },
    });
  });
};
