import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01'
import ModalSimple from '@solid-ui-blocks/Modal/Block02'
import ModalCart from '@solid-ui-blocks/Modal/Block03'
import Header from '@solid-ui-blocks/Header/Block01'
import Footer from '@solid-ui-blocks/Footer/Block01'
import Pricing from '@solid-ui-blocks/Pricing/Block01'
import Features from '@solid-ui-blocks/Features/Block06'
import Faq from '@solid-ui-blocks/Faq/Block01'
import { normalizeBlockContentNodes } from '@blocks-helpers'

const Pricing02 = props => {
  const { allBlockContent, allWpPage } = props.data
  const content = normalizeBlockContentNodes(allBlockContent?.nodes)

  return (
    <Layout {...props}>
      <Seo title='Home' />
      {/* Modals */}
      <ModalWithTabs content={content['authentication']} reverse />
      <ModalWithTabs content={content['contact']} />
      <ModalSimple content={content['advertisement']} />
      <ModalCart content={content['cart']} />
      {/* Blocks */}
      <Header content={content['header']} />
      <Divider space='6' />
      <Pricing content={content['pricing']} />
      <Divider space='5' />
      <Divider space='5' />
      <Features content={content['features']} />
      <Divider space='5' />
      <Container variant='narrow'>
        <Faq content={content['faq']} />
      </Container>
      <Divider space='5' />
      <Footer content={content['footer']} />
    </Layout>
  )
}

export const query = graphql`
  query innerpagePricing02BlockContent {
    allBlockContent(
      filter: { page: { in: ["innerpage/pricing-02", "shared"] } }
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

export default Pricing02
