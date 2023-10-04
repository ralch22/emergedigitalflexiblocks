import React from 'react';
import { graphql } from 'gatsby';
import { Box, Container, Flex } from 'theme-ui';
import Layout from '@solid-ui-layout/Layout';
import Seo from 'gatsby-plugin-wpgraphql-seo';
import Divider from '@solid-ui-components/Divider';
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01';
import ModalSimple from '@solid-ui-blocks/Modal/Block02';
import ModalCart from '@solid-ui-blocks/Modal/Block03';
import Header from '@solid-ui-blocks/Header/Block01';
import Contact from '@solid-ui-blocks/CallToAction/Block02';
import FeatureThree from '@solid-ui-blocks/FeaturesWithPhoto/Block10';
import FeatureTwo from '@solid-ui-blocks/FeaturesWithPhoto/Block05';
import FeatureFour from '@solid-ui-blocks/Features/Block10';
import Industries from '@solid-ui-blocks/Features/Block11';
import List from '@solid-ui-blocks/Features/Block04';
import Steps from '@solid-ui-blocks/Content/Block06';
import Choice from '@solid-ui-blocks/Features/Block02';
import Footer from '@solid-ui-blocks/Footer/Block01';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import Hero from '@solid-ui-blocks/Hero/Block04/Block04';

const AppDevelopment = props => {
  const { allBlockContent, allWpPage } = props.data;
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);

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
        <Flex sx={{ flexDirection: [`column`, null, `row`], m: [0, -4] }}>
          <div style={{ flexBasis: '50%' }}>
            <FeatureThree content={content['feature-three']} />
          </div>
          <div style={{ flexBasis: '50%' }}>
            <FeatureFour content={content['feature-four']} />
          </div>
        </Flex>
      </Container>
      <Divider space="5" />
      <Steps content={content['steps']} />
      <Divider space="5" />
      <Box
        sx={{ background: `linear-gradient(90deg, #336567 0%, #3F2B56 100%)` }}
      >
        <FeatureTwo content={content['feature-two']} />
      </Box>
      <Divider space="5" />
      <Industries content={content['industries']} />
      <Divider space="5" />
      <List content={content['card-list']} />
      <Divider space="5" />
      <Choice content={content['choice']} />
      <Divider space="5" />
      <Steps content={content['why']} />
      <Divider space="5" />
      <Contact content={content['cta']} />
      <Divider space="5" />
      <Footer content={content['footer']} />
    </Layout>
  );
};

export const query = graphql`
  query innerpageAppDevelopmentBlockContent {
    allBlockContent(
      filter: { page: { in: ["innerpage/app-development", "shared"] } }
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

export default AppDevelopment;
