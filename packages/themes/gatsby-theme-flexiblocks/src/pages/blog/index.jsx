import React from 'react';
import { graphql } from 'gatsby';
import { Container } from 'theme-ui';
import Layout from '@solid-ui-layout/Layout';
import Seo from '@solid-ui-components/Seo';
import Divider from '@solid-ui-components/Divider';
import Header from '@solid-ui-blocks/Header/Block01';
import Content from '@solid-ui-blocks/Content/Block02';
import BlogPage from '@solid-ui-blocks/BlogPage/Block01';
import Footer from '@solid-ui-blocks/Footer/Block01';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import styles from './_styles';

const Blog = props => {
 
  const { allBlockContent, allWpPost } = props.data; // Fetch posts from GraphQL query

  const content = normalizeBlockContentNodes(allBlockContent?.nodes);

  return (
    <Layout {...props}>
      <Seo title='Home' />
      <Header content={content['header']} />
      <Divider space='5' />
      <Container variant='wide' sx={styles.heroContainer}>
        <Content content={content['hero']} />
      </Container>
      <Divider space='5' />
      <Container>
        <BlogPage content={content['blog']} posts={allWpPost.nodes} /> {/* Pass fetched posts */}
      </Container>
      <Divider space='5' />
      <Footer content={content['footer']} />
    </Layout>
  );
};

export const query = graphql`
  query innerpageBlogBlockContent {
    allBlockContent(
      filter: { page: { in: ["innerpage/blog", "shared"] } }
    ) {
      nodes {
        ...BlockContent
      }
    }
    allWpPost {
      nodes {
        id
        title
        slug
        date
        content
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
            avatar {
              url
            }
            name
          }
        }
        
      }
    }
  }
`;

export default Blog;