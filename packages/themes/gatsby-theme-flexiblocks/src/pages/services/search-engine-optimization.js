import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby'
import { Container } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01'
import ModalSimple from '@solid-ui-blocks/Modal/Block02'
import Header from '@solid-ui-blocks/Header/Block01'
import Content from '@solid-ui-blocks/Content/Block01'
import Content2 from '@solid-ui-blocks/Content/Block07'
import Contact from '@solid-ui-blocks/CallToAction/Block02'
import FeatureThree from '@solid-ui-blocks/FeaturesWithPhoto/Block01'
import Services from '@solid-ui-blocks/Features/Block05'
import Specialist from '@solid-ui-blocks/Features/Block05'
import Faq from '@solid-ui-blocks/Faq/Block01'
import Footer from '@solid-ui-blocks/Footer/Block01'
import { normalizeBlockContentNodes } from '@blocks-helpers'
import styles from "./_styles"

const SearchEngine = props => {
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
        <Content2 reverse content={content['seo']} />
      <Divider space='5' />
      <Container>
        <FeatureThree reverseSm content={content['feature-one']} />
      </Container>
      <Divider space='5' />
      <Specialist content={content['specialist']} />
      <Divider space='5' />
      <Services content={content['services']} />
      <Divider space='5' />
      <Footer content={content['footer']} />
    </Layout>
  )
}

export const query = graphql`
  query innerpageGAnalyticsAuditBlockContent {
    allBlockContent(
      filter: { page: { in: ["innerpage/search-engine-optimization", "shared"] } }
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

export default SearchEngine
