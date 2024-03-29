import { graphql } from 'gatsby';
import PostsPage from '../containers/Posts';

export default PostsPage;

export const pageQuery = graphql`
  query PostsPageQuery {
    allBlockContent(filter: { page: { in: ["innerpage/blog", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
    recentPosts: allWpPost(sort: { date: DESC }, limit: 6) {
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
            slug
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

    posts: allWpPost(sort: { date: DESC }, limit: 1000) {
      group(field: { categories: { nodes: { name: SELECT } } }, limit: 10) {
        categoryName: fieldValue
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
              slug
            }
          }
          author {
            node {
              slug
              id
              avatar {
                url
              }
              name
            }
          }
        }
      }
    }
    allWpPage {
      nodes {
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
    }
  }
`;
