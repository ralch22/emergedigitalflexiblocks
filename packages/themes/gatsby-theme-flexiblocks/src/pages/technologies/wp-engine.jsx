import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby'
import { Container, Flex, Button } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01'
import ModalSimple from '@solid-ui-blocks/Modal/Block02'
import Header from '@solid-ui-blocks/Header/Block01'
import Content from '@solid-ui-blocks/Content/Block01'
import Content2 from '@solid-ui-blocks/Content/Block02'
import Content3 from '@solid-ui-blocks/Content/Block03'
import Content4 from '@solid-ui-blocks/Content/Block04'
import CustomTabSwitcher from '@solid-ui-blocks/Content/Tabs'
import Gallery from '@solid-ui-blocks/Blog/Block01'
import Contact from '@solid-ui-blocks/CallToAction/Block02'
import FeatureThree from '@solid-ui-blocks/FeaturesWithPhoto/Block01'
import FeatureFour from '@solid-ui-blocks/FeaturesWithPhoto/Block11'
import Feature4 from '@solid-ui-blocks/FeaturesWithPhoto/Block09'
import FeatureTwo from '@solid-ui-blocks/Features/Block02'
import Feature from '@solid-ui-blocks/Features/Block05'
import FeatureOne from '@solid-ui-blocks/FeaturesWithPhoto/Block13'
import Feature0 from '@solid-ui-blocks/FeaturesWithPhoto/Block00'
import Capabilities from '@solid-ui-blocks/Features/Block08'
import Campaign from '@solid-ui-blocks/Features/Block08'
import View from '@solid-ui-blocks/Features/Block09'
import Target from '@solid-ui-blocks/Features/Block12'
import Faq from '@solid-ui-blocks/Faq/Block01'
import SingleText from '@solid-ui-blocks/Content/Block07'
import Pricing from '@solid-ui-blocks/Pricing/Block01'
import Footer from '@solid-ui-blocks/Footer/Block01'
import { normalizeBlockContentNodes } from '@blocks-helpers'
import styles from "../_styles"


const WpEngine = props => {
  const { allBlockContent, allWpPage } = props.data
  const content = normalizeBlockContentNodes(allBlockContent?.nodes)

  return (
    <Layout {...props}>
      <Seo title='Home' />
      {/* Modals */}
      <ModalWithTabs content={content['authentication']} reverse />
      <ModalWithTabs content={content['contact']} />
      <ModalSimple content={content['advertisement']} />
      {/* Blocks */}
      <Header content={content['header']} />
      <Divider space='5' />
      <Container variant='wide' sx={styles.heroContainer}>
        <Content pageTitle="hello" content={content['hero']} />
      </Container>
      <Divider space='5' />
      <Container>
        <FeatureThree reverseSm content={content['feature-one']} />
      </Container>
      <Divider space='5' />
      <Container>
        <FeatureThree content={content['speed']} />
        <Divider space='3' />
        <FeatureThree reverse content={content['support']} />
        <Divider space='3' />
        <FeatureThree content={content['security']} />
      </Container>
      <Divider space='5' />
      <Flex sx={{ justifyContent: `center`, alignItems: 'center', flexDirection: 'column' }}>
        <img style={{ width: 'inherit' }} src="https://emergedigital.ae/wp-content/uploads/2019/10/WPEngine_Member-Badge.png" alt="" />
        <Divider space='3' />
        <Button variant="secondary" to="/dd" ml={2}>
            GET 2 MONTHS FREE
        </Button>
      </Flex>
      <Divider space='5' />
      <Container>
        <FeatureTwo content={content['developer']} />
      </Container>
      <Divider space='5' />
      <Container>
        <FeatureTwo content={content['enterprise']} />
      </Container>
      <Divider space='5' />
      <Container>
        <FeatureTwo double content={content['hosting']} />
      </Container>
      <Divider space='5' />
      <Container>
        <FeatureTwo double content={content['store']} />
      </Container>
      <Divider space='5' />
      <SingleText content={content['intro']} />
      <Divider space='5' />
      <Container>
        <FeatureThree reverseSm content={content['feature-two']} />
      </Container>
      <Divider space='5' />
      
      <Footer content={content['footer']} />
    </Layout>
  )
}
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
`
export default WpEngine
