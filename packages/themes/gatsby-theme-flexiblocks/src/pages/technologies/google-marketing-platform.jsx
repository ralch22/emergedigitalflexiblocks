import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby'
import { Container, Tabs, TabList, Tab, TabPanels, TabPanel } from 'theme-ui'
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
import FeatureThree from '@solid-ui-blocks/FeaturesWithPhoto/Block12'
import FeatureFour from '@solid-ui-blocks/FeaturesWithPhoto/Block11'
import Feature4 from '@solid-ui-blocks/FeaturesWithPhoto/Block09'
import FeatureTwo from '@solid-ui-blocks/FeaturesWithPhoto/Block05'
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

import {  } from 'react-icons/fa'

const PaidMediaPag = props => {
  const { allBlockContent } = props.data
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
        <FeatureFour content={content['feature-two']} />
        <Divider space='3' />
        <FeatureFour content={content['feature-three']} />
      </Container>
      <Divider space='5' />
      <Container>
        <Faq content={content['faq1']} />
      </Container>
      <Divider space='5' />
      <SingleText content={content['intro']} />
      <Divider space='5' />
      <Container>
        <Feature4 simpleImg dangerously content={content['feature-four']} />
      </Container>
      <Divider space='5' />
      <Container>
        <FeatureOne content={content['campaign']} />
      </Container>
      <Divider space='2' />
      <Container>
        <FeatureTwo content={content['inovating']} />
      </Container>
      <Divider space='5' />
      <Container>
        <FeatureFour content={content['result']} />
      </Container>
      <Divider space='5' />
      <Container>
        <FeatureTwo content={content['paid']} />
      </Container>
      <Divider space='5' />
      <Feature0 content={content['ppc']} />
      <Divider space='5' />
      <Container>
        <FeatureOne content={content['searching']} />
      </Container>
      <Divider space='2' />
      <Container>
        <FeatureTwo content={content['target']} />
      </Container>
      <Divider space='5' />
      <Container>
        <Faq content={content['faq2']} />
      </Container>
      <Divider space='5' />
      <Container>
        <FeatureOne column content={content['video']} />
      </Container>
      <Divider space='2' />
      <Container>
        <FeatureTwo bottomText content={content['analytics']} />
      </Container>
      <Divider space='5' />
      <Container>
        <Faq content={content['faq3']} />
      </Container>
      <Divider space='5' />
      <Target content={content['advanced']} />
      <Container>
        <FeatureOne column content={content['service']} />
      </Container>
      <Divider space='5' />
      <Footer content={content['footer']} />
    </Layout>
  )
}
export const query = graphql`
  query homepageMarketingBlockContent {
    allBlockContent(
      filter: { page: { in: ["innerpage/google-marketing-platform", "shared"] } }
    ) {
      nodes {
        ...BlockContent
      }
    }
  }
`
export default PaidMediaPag
