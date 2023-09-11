module.exports = async (
  { graphql, actions, reporter },
  pluginOptions,
  { template }
) => {
  const { createPage } = actions
  const { pageContextOptions } = pluginOptions

  const result = await graphql(`
    {
      allWpPost(
        sort: [{ date: DESC }, { title: ASC }]
        limit: 1000
      ) {
        edges {
          node {
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
                name
              }
            }
            author {
              node {
                id
                slug
                avatar {
                  url
                }
                description
                name
              }
            }
            tags {
              nodes {
                name
                slug
                id
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  const { allWpPost } = result.data
  const posts = allWpPost.edges
  console.log("singlePost", posts)
  posts.forEach(({ node }, index) => {
    const { id, slug, categories, tags, link } = node

    if (link) return //skip creating pages for nodes linking to external sites

    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]

    //For querying related posts based on tags and category
    const categoriesId = (categories && categories.nodes.map(category => category && category.id))
    const tagsIds = (tags && tags.nodes.map(tag => tag && tag.id))
    const hasTags = tagsIds.length > 0

    createPage({
      path: `/posts/${slug}`,
      component: template,
      context: {
        id,
        categoriesId,
        tagsIds,
        hasTags,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined,
        ...pageContextOptions
      }
    })
  })
}
