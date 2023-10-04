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
import Content3 from '@solid-ui-blocks/Content/Block03';
import Content4 from '@solid-ui-blocks/Content/Block04';
import Contact from '@solid-ui-blocks/CallToAction/Block02';
import FeatureThree from '@solid-ui-blocks/FeaturesWithPhoto/Block01';
import FeatureTwo from '@solid-ui-blocks/FeaturesWithPhoto/Block01';
import Inclusions from '@solid-ui-blocks/FeaturesWithPhoto/Block02';
import Hero from '@solid-ui-blocks/Hero/Block04/Block04';
import Faq from '@solid-ui-blocks/Faq/Block01';
import Footer from '@solid-ui-blocks/Footer/Block01';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import servicesData from '@elegantstack/gatsby-starter-flexiblocks/content/blocks/innerpage/services-03/services.json';
import servicesData1 from '@elegantstack/gatsby-starter-flexiblocks/content/blocks/innerpage/services-03/services1.json';

const GAnalyticsAudit = props => {
  const { allBlockContent, allWpPage } = props.data;
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);

  const tabs = [
    { title: 'Overview', content: <Content4 content={servicesData1} /> },
    { title: 'Our Services', content: <Content3 content={servicesData} /> },
  ];
  const uri = props.path;
  const filter = allWpPage.nodes.filter(page => {
    return page.uri === uri;
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
      <Container>
        <FeatureThree reverseSm content={content['feature-one']} />
      </Container>
      <Divider space="5" />
      <Inclusions content={content['inclusions']} />
      <Divider space="5" />
      <Container>
        <FeatureTwo reverse content={content['feature-two']} />
      </Container>
      <Divider space="5" />
      <Container>
        <Faq content={content['faq']} />
      </Container>
      <Divider space="5" />
      <Contact content={content['cta']} />
      <Divider space="5" />
      <Footer content={content['footer']} />
    </Layout>
  );
};

export const query = graphql`
  query innerpageGAnalyticsAuditBlockContent {
    allBlockContent(
      filter: {
        page: { in: ["innerpage/google-analytics-4-training", "shared"] }
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

export default GAnalyticsAudit;
