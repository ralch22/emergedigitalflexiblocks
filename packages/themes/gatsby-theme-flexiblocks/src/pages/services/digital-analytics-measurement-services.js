import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from 'gatsby-plugin-wpgraphql-seo'
import Divider from '@solid-ui-components/Divider'
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01'
import ModalSimple from '@solid-ui-blocks/Modal/Block02'
import Header from '@solid-ui-blocks/Header/Block01'
import Content from '@solid-ui-blocks/Content/Block01'
import List from '@solid-ui-blocks/Features/Block05'
import Choice from '@solid-ui-blocks/Features/Block02'
import View from '@solid-ui-blocks/Content/Block08'
import FeatureThree from '@solid-ui-blocks/FeaturesWithPhoto/Block01'
import Footer from '@solid-ui-blocks/Footer/Block01'
import { normalizeBlockContentNodes } from '@blocks-helpers'
import styles from '../_styles'
import { regexString } from '../../utils/filter'
// import servicesData from '../../../../../../site/content/blocks/innerpage/services-03/services.json';
// import servicesData1 from '../../../../../../site/content/blocks/innerpage/services-03/services1.json';

const GAnalyticsAudit = props => {
  const { allBlockContent, allWpPage } = props.data
  const content = normalizeBlockContentNodes(allBlockContent?.nodes)

  // const tabs = [
  //   { title: 'Overview', content: <Content4 content={servicesData1} /> },
  //   { title: 'Our Services', content: <Content3 content={servicesData} /> },
  // ];
  const uri = regexString(props.uri)
  const filter = allWpPage.nodes.filter(page => {
    return page.slug === uri
  })
  const post = filter[0]
  return (
    <Layout {...props}>
      <Seo post={post} />
      {/* Modals */}
      <ModalWithTabs content={content['authentication']} reverse />
      <ModalWithTabs content={content['contact']} />
      <ModalSimple content={content['advertisement']} />
      {/* Blocks */}
      <Header content={content['header']} />
      <Divider space='5' />
      <Container variant='wide' sx={styles.heroContainer}>
        <Content pageTitle='hello' content={content['hero']} />
      </Container>
      <Divider space='5' />
      <Container>
        <FeatureThree reverseSm content={content['feature-one']} />
      </Container>
      <Divider space='5' />
      <Container>
        <View content={content['digital']} />
      </Container>
      <Divider space='5' />
      <List content={content['measurement']} />
      <Divider space='5' />
      <Choice content={content['analytics']} />

      <Divider space='5' />
      <Footer content={content['footer']} />
    </Layout>
  )
}

export const query = graphql`
  query innerpageGAnalyticsAuditBlockContent {
    allBlockContent(
      filter: {
        page: {
          in: ["innerpage/digital-analytics-measurement-services", "shared"]
        }
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
`

export default GAnalyticsAudit
