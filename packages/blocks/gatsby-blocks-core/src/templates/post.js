import { graphql } from 'gatsby'
import PostPage from '../containers/Post'

export default PostPage

export const pageQuery = graphql`
  query PostPageQuery(
    $id: String!
    $previousId: String
    $nextId: String
    $categoriesId: [String]
    $tagsIds: [String]
    $hasTags: Boolean!
  ) {
    allBlockContent(
      filter: { page: { in: ["innerpage/blog", "shared"] } }
   ) {
      nodes {
        ...BlockContent
      }
    }
    tagPosts: allWpPost(
      filter: {
        tags: { nodes: { elemMatch: { id: { in: $tagsIds } } } }
        id: { ne: $id }
      }
      sort: { date: DESC }
      limit: 6
    ) @include(if: $hasTags) {
        nodes {
        id
        title
        slug
        date(formatString: "MMMM DD, YYYY")
        content
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
            avatar {
              url
            }
            name
          }
        }
      }
    }
    categoryPosts: allWpPost(
      filter: {
        categories: { nodes: { elemMatch: { id: { in: $categoriesId } } } }
        id: { ne: $id }
      }
      sort: { date: DESC }
      limit: 6
    ) {
        nodes {
        id
        title
        slug
        date(formatString: "MMMM DD, YYYY")
        content
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
            avatar {
              url
            }
            name
          }
        }
      }
    }
    previous: wpPost(id: { eq: $previousId }) {
      id
      slug
      title
    }
    next: wpPost(id: { eq: $nextId }) {
      id
      slug
      title
    }
  }
`
