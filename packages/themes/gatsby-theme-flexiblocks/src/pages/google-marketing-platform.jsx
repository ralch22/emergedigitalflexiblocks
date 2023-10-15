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
import FeatureThree from '@solid-ui-blocks/FeaturesWithPhoto/Block12';
import FeatureFour from '@solid-ui-blocks/FeaturesWithPhoto/Block11';
import Feature4 from '@solid-ui-blocks/FeaturesWithPhoto/Block09';
import FeatureTwo from '@solid-ui-blocks/FeaturesWithPhoto/Block05';
import FeatureOne from '@solid-ui-blocks/FeaturesWithPhoto/Block13';
import Feature0 from '@solid-ui-blocks/FeaturesWithPhoto/Block00';
import Hero from '@solid-ui-blocks/Hero/Block04/Block04';
import Target from '@solid-ui-blocks/Features/Block12';
import Faq from '@solid-ui-blocks/Faq/Block01';
import SingleText from '@solid-ui-blocks/Content/Block07';
import Footer from '@solid-ui-blocks/Footer/Block01';
import { normalizeBlockContentNodes } from '@blocks-helpers';

const PaidMediaPag = props => {
  const { allBlockContent, allWpPage } = props.data;
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  const uri = props.path;
  const filtered = allWpPage.nodes.filter(page => {
    return page.uri === uri;
  });
  const post = filtered[0];
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
      <Container>
        <FeatureFour content={content['feature-two']} />
        <Divider space="3" />
        <FeatureFour content={content['feature-three']} />
      </Container>
      <Divider space="5" />
      <Container>
        <Faq content={content['faq1']} />
      </Container>
      <Divider space="5" />
      <SingleText content={content['intro']} />
      <Divider space="5" />
      <Container>
        <Feature4
          simpleImg
          dangerously
          reverseSm
          content={content['feature-four']}
        />
      </Container>
      <Divider space="5" />
      <Container>
        <FeatureOne content={content['campaign']} />
      </Container>
      <Divider space="2" />
      <Container>
        <FeatureTwo content={content['inovating']} />
      </Container>
      <Divider space="5" />
      <Container>
        <FeatureFour content={content['result']} />
      </Container>
      <Divider space="5" />
      <Container>
        <FeatureTwo content={content['paid']} />
      </Container>
      <Divider space="5" />
      <Feature0 content={content['ppc']} />
      <Divider space="5" />
      <Container>
        <FeatureOne content={content['searching']} />
      </Container>
      <Divider space="2" />
      <Container>
        <FeatureTwo content={content['target']} />
      </Container>
      <Divider space="5" />
      <Container>
        <Faq content={content['faq2']} />
      </Container>
      <Divider space="5" />
      <Container>
        <FeatureOne column content={content['video']} />
      </Container>
      <Divider space="2" />
      <Container>
        <FeatureTwo bottomText content={content['analytics']} />
      </Container>
      <Divider space="5" />
      <Container>
        <Faq content={content['faq3']} />
      </Container>
      <Divider space="5" />
      <Target content={content['advanced']} />
      <Container>
        <FeatureOne column content={content['service']} />
      </Container>
      <Divider space="5" />
      <Footer content={content['footer']} />
    </Layout>
  );
};
export const query = graphql`
  query homepageMarketingBlockContent {
    allBlockContent(
      filter: {
        page: { in: ["innerpage/google-marketing-platform", "shared"] }
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
export default PaidMediaPag;
