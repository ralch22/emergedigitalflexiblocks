import React from 'react';
import { graphql } from 'gatsby';
import { Container } from 'theme-ui';
import Layout from '@solid-ui-layout/Layout';
import Seo from 'gatsby-plugin-wpgraphql-seo';
import Divider from '@solid-ui-components/Divider';
import Calendly from '@solid-ui-components/Calendly';
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01';
import ModalSimple from '@solid-ui-blocks/Modal/Block02';
import ModalCart from '@solid-ui-blocks/Modal/Block03';
import Header from '@solid-ui-blocks/Header/Block01';
import Hero from '@solid-ui-blocks/Hero/Block01';
import Companies from '@solid-ui-blocks/Companies/Block01';
import Services from '@solid-ui-blocks/Features/Block02';
import FeatureThree from '@solid-ui-blocks/FeaturesWithPhoto/Block01';
import WhyChooseUs from '@solid-ui-blocks/Features/Block01';
import FeatureTwo from '@solid-ui-blocks/FeaturesWithPhoto/Block02';
import Strategies from '@solid-ui-blocks/Stats/Block01';
import Testimonials from '@solid-ui-blocks/Testimonials/Block01';
import GetStarted from '@solid-ui-blocks/CallToAction/Block01';
import NewsletterExpanded from '@solid-ui-blocks/NewsletterExpanded';
import Blog from '@solid-ui-blocks/Blog/Block01';
import Footer from '@solid-ui-blocks/Footer/Block01';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import styles from './_homeStyle';
import { regexString } from '../utils/filter';

const IndexPage = props => {
  const { allBlockContent, posts, allWpPage } = props.data;
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  const uri = regexString(props.uri);
  const filter = allWpPage.nodes.filter(page => {
    return page.slug === 'home';
  });
  const post = filter[0];
  return (
    <Layout {...props}>
      <Seo post={post} />
      {/* Modals */}
      <ModalWithTabs content={content['authentication']} reverse />
      <ModalWithTabs content={content['contact']} />
      <ModalSimple content={content['advertisement']} />
      <ModalCart content={content['cart']} />
      {/* Blocks */}
      <Header content={content['header']} />
      <Divider space="5" />
      <Divider space="5" />
      <Container variant="full" sx={styles.heroContainer}>
        <Hero content={content['hero']} />
      </Container>
      <Divider space="3" />
      <Companies content={content['companies']} />
      <Divider space="5" />
      <Divider space="5" />
      <FeatureThree reverseSm content={content['feature-one']} />
      <Divider space="5" />
      <Divider space="5" />
      <Container variant="wide" sx={styles.whyChooseUsContainer}>
        <WhyChooseUs content={content['why-choose-us']} />
      </Container>
      <Divider space="5" />
      <Divider space="5" />
      <Services content={content['services']} />
      <Divider space="5" />
      <Divider space="5" />
      <FeatureTwo content={content['feature-two']} />
      <Divider space="5" />
      <Divider space="5" />
      <NewsletterExpanded content={content['newsletter']} />
      <Divider space="5" />
      <Blog posts={posts} content={content['latest-blogs']} />
      <Divider space="6" />
      <Divider space="6" />
      <Container variant="full" sx={styles.strategiesContainer}>
        <Divider space={-6} />
        <Strategies content={content['strategies']} />
      </Container>
      <Divider space="5" />
      <Divider space="5" />
      <Testimonials content={content['testimonials']} />
      <Divider space="5" />
      <Divider space="5" />
      <Calendly content={content['calendar']} />
      <Divider space="5" />
      <Divider space="5" />
      <GetStarted content={content['get-started']} />
      <Divider space="5" />
      <Footer content={content['footer']} />
    </Layout>
  );
};

export const query = graphql`
  query homepageMarketingBlockContent {
    allBlockContent(
      filter: { page: { in: ["homepage/marketing", "shared"] } }
    ) {
      nodes {
        ...BlockContent
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
    posts: allWpPost(sort: { date: DESC }, limit: 3) {
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
export default IndexPage;
