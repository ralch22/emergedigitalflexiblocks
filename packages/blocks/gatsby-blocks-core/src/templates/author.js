import { graphql } from 'gatsby';
import AuthorPage from '../containers/Author';

export default AuthorPage;

export const pageQuery = graphql`
  query AuthorPageQuery($id: String!, $previousId: String, $nextId: String) {
    allBlockContent(filter: { page: { in: ["innerpage/blog", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
    author: wpUser(id: { eq: $id }) {
      id
      slug
      avatar {
        url
      }
      description
      name
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
      }
    }
    wpUser(id: { eq: $id }) {
      slug
      name
      uri
      seo {
        title
        metaDesc
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
