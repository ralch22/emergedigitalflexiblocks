import { graphql } from 'gatsby';
import PostPage from '../containers/Post';

export default PostPage;

export const pageQuery = graphql`
  query PostPageQuery(
    $id: String!
    $previousId: String
    $nextId: String
    $categoriesId: [String]
    $tagsIds: [String]
    $hasTags: Boolean!
  ) {
    allBlockContent(filter: { page: { in: ["innerpage/blog", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
    post: wpPost(id: { eq: $id }) {
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
          id
          name
        }
      }
      tags {
        nodes {
          id
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
          description
        }
      }
    }
    tagCategoryPosts: allWpPost(
      filter: {
        tags: { nodes: { elemMatch: { id: { in: $tagsIds } } } }
        categories: { nodes: { elemMatch: { id: { in: $categoriesId } } } }
        id: { ne: $id }
      }
      sort: { date: DESC }
      limit: 1000
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
    allWpPost(sort: { date: DESC }, limit: 1000) {
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
            id
            name
          }
        }
        tags {
          nodes {
            id
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
    wpPost(id: { eq: $id }) {
      nodeType
      slug
      title
      uri
      seo {
        title
        metaDesc
        focuskw
        metaKeywords
        metaRobotsNoindex
        metaRobotsNofollow
        opengraphTitle
        opengraphDescription
        opengraphImage {
          altText
          sourceUrl
          srcSet
        }
        twitterTitle
        twitterDescription
        twitterImage {
          altText
          sourceUrl
          srcSet
        }
        canonical
        cornerstone
        schema {
          articleType
          pageType
          raw
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
`;
