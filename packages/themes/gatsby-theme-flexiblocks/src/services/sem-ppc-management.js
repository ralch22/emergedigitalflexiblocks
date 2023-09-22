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
import FeatureThree from '@solid-ui-blocks/FeaturesWithPhoto/Block01'
import Feature4 from '@solid-ui-blocks/FeaturesWithPhoto/Block09'
import FeatureTwo from '@solid-ui-blocks/FeaturesWithPhoto/Block01'
import Capabilities from '@solid-ui-blocks/Features/Block08'
import Campaign from '@solid-ui-blocks/Features/Block08'
import View from '@solid-ui-blocks/Features/Block09'
import Target from '@solid-ui-blocks/Features/Block04'
import Faq from '@solid-ui-blocks/Faq/Block01'
import Pricing from '@solid-ui-blocks/Pricing/Block01'
import Footer from '@solid-ui-blocks/Footer/Block01'
import { normalizeBlockContentNodes } from '@blocks-helpers'
import styles from "./_styles"
import servicesData from '../../../../../../site/content/blocks/innerpage/services-03/services.json';
import servicesData1 from '../../../../../../site/content/blocks/innerpage/services-03/services1.json';

import {  } from 'react-icons/fa'

const PaidMediaPag = props => {
  const { allBlockContent } = props.data
  const content = normalizeBlockContentNodes(allBlockContent?.nodes)

  
  const tabs = [
    { title: 'Overview', content: <Content4 content={servicesData1} /> },
    { title: 'Our Services', content: <Content3 content={servicesData} /> },
  ];
  
 
  

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
        <FeatureThree content={content['feature-one']} />
      </Container>
      <Divider space='5' />
      <Capabilities content={content['target']} />
      <Divider space='5' />
      <Target content={content['ppc']} />
      <Divider space='5' />
      <Campaign content={content['campaign']} />
      <Divider space='5' />
      <Pricing content={content['pricing']} />
      <Divider space='5' />
      <View content={content['view']} />
      <Divider space='5' />
      <Feature4 content={content['result']} />
      <Divider space='5' />
      <Feature4 reverse content={content['expertise']} />
      <Divider space='5' />
      <Feature4 content={content['searching']} />
      <Divider space='5' />
      <Feature4 reverse content={content['inovating']} />
      <Divider space='5' />
      <Contact content={content['cta']} />
      <Divider space='5' />
      <Container>
        <Faq content={content['faq']} />
      </Container>
      <Divider space='5' />
      <Footer content={content['footer']} />
    </Layout>
  )
}

export const query = graphql`
  query innerpageGAnalyticsAuditBlockContent {
    allBlockContent(
      filter: { page: { in: ["innerpage/sem-ppc-management", "shared"] } }
    ) {
      nodes {
        ...BlockContent
      }
    }
  }
`

export default PaidMediaPag
