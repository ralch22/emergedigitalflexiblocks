import React from 'react';
import { graphql } from 'gatsby';
import { Container } from 'theme-ui';
import Layout from '@solid-ui-layout/Layout';
import Seo from 'gatsby-plugin-wpgraphql-seo';
import Divider from '@solid-ui-components/Divider';
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01';
import ModalSimple from '@solid-ui-blocks/Modal/Block02';
import ModalCart from '@solid-ui-blocks/Modal/Block03';
import Header from '@solid-ui-blocks/Header/Block01';
import Content2 from '@solid-ui-blocks/Content/Block07';
import FeatureThree from '@solid-ui-blocks/FeaturesWithPhoto/Block01';
import Services from '@solid-ui-blocks/Features/Block05';
import Specialist from '@solid-ui-blocks/Features/Block05';
import Hero from '@solid-ui-blocks/Hero/Block04/Block04';
import Footer from '@solid-ui-blocks/Footer/Block01';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import { regexString } from '../utils/filter';

const SearchEngine = props => {
  const { allBlockContent, allWpPage } = props.data;
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);

  const uri = regexString(props.uri);
  const filter = allWpPage.nodes.filter(page => {
    return page.slug === uri;
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
      <Hero content={content['page-title']} />
      <Divider space="5" />
      <Content2 reverse content={content['seo']} />
      <Divider space="5" />
      <Container>
        <FeatureThree reverseSm content={content['feature-one']} />
      </Container>
      <Divider space="5" />
      <Specialist content={content['specialist']} />
      <Divider space="5" />
      <Services content={content['services']} />
      <Divider space="5" />
      <Footer content={content['footer']} />
    </Layout>
  );
};

export const query = graphql`
  query innerpageGAnalyticsAuditBlockContent {
    allBlockContent(
      filter: {
        page: { in: ["innerpage/search-engine-optimization", "shared"] }
      }
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
  }
`;

export default SearchEngine;
