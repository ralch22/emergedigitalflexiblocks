const postQuery = `{
  posts: allWpPost {
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
            name
          }
        }
        
      }
    }
  }
}
`

const flatten = arr =>
  arr.map(({ node: { ...rest } }) => ({
    ...rest
  }))

const settings = {
  attributesToSnippet: ['excerpt:20'],
  attributeForDistinct: 'category.name'
}

const queries = [
  {
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME || 'Posts',
    query: postQuery,
    settings,
    transformer: ({ data }) => flatten(data.posts.edges)
  }
]

module.exports = queries
