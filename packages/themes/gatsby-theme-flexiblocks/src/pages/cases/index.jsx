import React from 'react';
import { graphql } from 'gatsby'
import { Container } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import Header from '@solid-ui-blocks/Header/Block01'
import Content from '@solid-ui-blocks/Content/Block02'
import Cases from '@solid-ui-blocks/Cases/Block01'
import Footer from '@solid-ui-blocks/Footer/Block01'
import { normalizeBlockContentNodes } from '@blocks-helpers'
import styles from './_styles';

const Blog = props => {
  const { allBlockContent } = props.data
  const content = normalizeBlockContentNodes(allBlockContent?.nodes)


  return (
    <Layout {...props}>
      <Seo title='Home' />
      <Header content={content['header']} />
      <Divider space='5' />
      <Container variant='wide' sx={styles.heroContainer}>
        <Content content={content['hero']} />
      </Container>
      <Divider space='5' />
      <Container>
        <Cases content={content['cases']} />
       </Container>
      <Divider space='5' />
      <Footer content={content['footer']} />
    </Layout>
  )
}

export const query = graphql`
  query innerpageCasesBlockContent {
    allBlockContent(
      filter: { page: { in: ["innerpage/cases", "shared"] } }
    ) {
      nodes {
        ...BlockContent
      }
    }
  }
`

export default Blog
