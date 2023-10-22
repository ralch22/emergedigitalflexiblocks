import { graphql } from 'gatsby';
import CategoryPage from '../containers/Category';

export default CategoryPage;

export const pageQuery = graphql`
  query CategoryPageQuery($id: String!) {
    allBlockContent(filter: { page: { in: ["innerpage/blog", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
    wpCategory(id: { eq: $id }) {
      nodeType
      slug
      name
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
          raw
        }
      }
    }
    category: wpCategory(id: { eq: $id }) {
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
`;
