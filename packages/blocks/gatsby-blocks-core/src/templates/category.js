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
