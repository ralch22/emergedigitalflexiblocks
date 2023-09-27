import React, { useState } from 'react';
import { graphql } from 'gatsby'
import { Container, Box, Flex } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01'
import ModalSimple from '@solid-ui-blocks/Modal/Block02'
import Header from '@solid-ui-blocks/Header/Block01'
import Content from '@solid-ui-blocks/Content/Block01'
import Content8 from '@solid-ui-blocks/Content/Block08'
import SingleText from '@solid-ui-blocks/Content/Block07'
import Demand from '@solid-ui-blocks/Features/Block08'
import Values from '@solid-ui-blocks/Features/Block02'
import How from '@solid-ui-blocks/Features/Block02'
import FeatureThree from '@solid-ui-blocks/FeaturesWithPhoto/Block01'
import Feature4 from '@solid-ui-blocks/FeaturesWithPhoto/Block09'
import View from '@solid-ui-blocks/Content/Block08'
import Generation from '@solid-ui-blocks/Features/Block02'
import Footer from '@solid-ui-blocks/Footer/Block01'
import { normalizeBlockContentNodes } from '@blocks-helpers'
import styles from "./_styles"

const SearchEngine = props => {
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
      <Demand content={content['demand']} />
      <Divider space='5' />
      <Container>
      <View content={content['view']} />
      <Divider space='5' />
      <Feature4 content={content['result']} />
      <Divider space='5' />
      <Feature4 reverse content={content['expertise']} />
      <Divider space='5' />
      <Feature4 content={content['searching']} />
      <Divider space='5' />
      <Feature4 reverse content={content['inovating']} />
      </Container>
      <Divider space='5' />
      <Box sx={{ background: `linear-gradient(90deg, #336567 0%, #3F2B56 100%)` }}>
        <Container>
          <Flex sx={{ flexDirection: [`column`, `row`], m: -3, py: 5 }}>
            <Content8 content={content['do']} />
            <Divider space={5} sx={{ background: `#fff`, width: "2px", height: `100%` }} />
            <Content8 content={content['example']} />
          </Flex>
        </Container>
      </Box>
      <Divider space='5' />
      <Generation content={content['target']} />
      <Divider space='3' />
      <SingleText content={content['bottom-text']} />
      <Divider space='5' />
      <Box sx={{ background: ` linear-gradient(266deg, rgb(51, 101, 103) 0%, rgb(63, 43, 86) 100%)` }}>
        <Container>
          <Flex sx={{ flexDirection: [`column`, `row`], m: -3, py: 5  }}>
            <Content8 content={content['generation']} />
            <Divider space={5} sx={{ background: `#fff`, width: "2px", height: `100%` }} />
            <Content8 content={content['marketing']} />
          </Flex>
        </Container>
      </Box>
      <Divider space='5' />
      <SingleText content={content['serve']} />
      <Divider space='5' />
      <Values content={content['values']} />
      <Divider space='5' />
      <How col content={content['how']} />
      <Divider space='5' />
      <Footer content={content['footer']} />
    </Layout>
  )
}

export const query = graphql`
  query innerpageGAnalyticsAuditBlockContent {
    allBlockContent(
      filter: { page: { in: ["innerpage/b2b-demand-generation-services", "shared"] } }
    ) {
      nodes {
        ...BlockContent
      }
    }
  }
`

export default SearchEngine
