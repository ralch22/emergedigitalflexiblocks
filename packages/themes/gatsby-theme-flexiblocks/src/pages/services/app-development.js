import React, { useState } from 'react';
import { graphql } from 'gatsby'
import { Container, Flex, Box } from 'theme-ui'
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
import FeatureThree from '@solid-ui-blocks/FeaturesWithPhoto/Block10'
import FeatureTwo from '@solid-ui-blocks/FeaturesWithPhoto/Block05'
import FeatureFour from '@solid-ui-blocks/Features/Block10'
import Industries from '@solid-ui-blocks/Features/Block11'
import List from '@solid-ui-blocks/Features/Block04'
import Steps from '@solid-ui-blocks/Content/Block06'
import Choice from '@solid-ui-blocks/Features/Block02'
import Footer from '@solid-ui-blocks/Footer/Block01'
import { normalizeBlockContentNodes } from '@blocks-helpers'
import styles from "./_styles"


const AppDevelopment = props => {
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
        <Flex sx={{ flexDirection: [`column`, null, `row`], m: [0, -4] }}>
        <div style={{ flexBasis: "50%" }}>
            <FeatureThree content={content['feature-three']} />
        </div>
        <div style={{ flexBasis: "50%" }}>
            <FeatureFour content={content['feature-four']} />
        </div>
        </Flex>
      </Container>
      <Divider space='5' />
      <Steps content={content['steps']} />
      <Divider space='5' />
      <Box sx={{ background: `linear-gradient(90deg, #336567 0%, #3F2B56 100%)` }}>
        <FeatureTwo content={content['feature-two']} />
      </Box>
      <Divider space='5' />
      <Industries content={content['industries']} />
      <Divider space='5' />
      <List content={content['card-list']} />
      <Divider space='5' />
      <Choice content={content['choice']} />
      <Divider space='5' />
      <Steps content={content['why']} />
      <Divider space='5' />
      <Contact content={content['cta']} />
      <Divider space='5' />
      <Footer content={content['footer']} />
    </Layout>
  )
}

export const query = graphql`
  query innerpageAppDevelopmentBlockContent {
    allBlockContent(
      filter: { page: { in: ["innerpage/app-development", "shared"] } }
    ) {
      nodes {
        ...BlockContent
      }
    }
  }
`

export default AppDevelopment
