import React from 'react';
import { graphql } from 'gatsby';
import { Button, Container, Flex } from 'theme-ui';
import Layout from '@solid-ui-layout/Layout';
import Divider from '@solid-ui-components/Divider';
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01';
import ModalSimple from '@solid-ui-blocks/Modal/Block02';
import Header from '@solid-ui-blocks/Header/Block01';
import Content from '@solid-ui-blocks/Content/Block01';
import FeatureThree from '@solid-ui-blocks/FeaturesWithPhoto/Block01';
import FeatureTwo from '@solid-ui-blocks/Features/Block02';
import SingleText from '@solid-ui-blocks/Content/Block07';
import Footer from '@solid-ui-blocks/Footer/Block01';
import Seo from 'gatsby-plugin-wpgraphql-seo';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import styles from '../_styles';
import { regexString } from '../../utils/filter';

const WpEngine = props => {
  const { allBlockContent, allWpPage } = props.data;
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  const uri = regexString(props.uri);
  const filtered = allWpPage.nodes.filter(page => {
    return page.slug === uri;
  });
  const post = filtered[0];
  return (
    <Layout {...props}>
      <Seo post={post} />
      {/* Modals */}
      <ModalWithTabs content={content['authentication']} reverse />
      <ModalWithTabs content={content['contact']} />
      <ModalSimple content={content['advertisement']} />
      {/* Blocks */}
      <Header content={content['header']} />
      <Divider space="5" />
      <Container variant="wide" sx={styles.heroContainer}>
        <Content pageTitle="hello" content={content['hero']} />
      </Container>
      <Divider space="5" />
      <Container>
        <FeatureThree reverseSm content={content['feature-one']} />
      </Container>
      <Divider space="5" />
      <Container>
        <FeatureThree content={content['speed']} />
        <Divider space="3" />
        <FeatureThree reverse content={content['support']} />
        <Divider space="3" />
        <FeatureThree content={content['security']} />
      </Container>
      <Divider space="5" />
      <Flex
        sx={{
          justifyContent: `center`,
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img
          style={{ width: 'inherit' }}
          src="https://emergedigital.ae/wp-content/uploads/2019/10/WPEngine_Member-Badge.png"
          alt=""
        />
        <Divider space="3" />
        <Button variant="secondary" to="/dd" ml={2}>
          GET 2 MONTHS FREE
        </Button>
      </Flex>
      <Divider space="5" />
      <Container>
        <FeatureTwo content={content['developer']} />
      </Container>
      <Divider space="5" />
      <Container>
        <FeatureTwo content={content['enterprise']} />
      </Container>
      <Divider space="5" />
      <Container>
        <FeatureTwo double content={content['hosting']} />
      </Container>
      <Divider space="5" />
      <Container>
        <FeatureTwo double content={content['store']} />
      </Container>
      <Divider space="5" />
      <SingleText content={content['intro']} />
      <Divider space="5" />
      <Container>
        <FeatureThree reverseSm content={content['feature-two']} />
      </Container>
      <Divider space="5" />

      <Footer content={content['footer']} />
    </Layout>
  );
};
export const query = graphql`
  query homepageMarketingBlockContent {
    allBlockContent(
      filter: { page: { in: ["innerpage/wp-engine", "shared"] } }
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
export default WpEngine;
