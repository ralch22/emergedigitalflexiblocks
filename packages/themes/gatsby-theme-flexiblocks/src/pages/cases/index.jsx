import React, {useEffect, useState} from 'react';
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
  const [cases, setCases] = useState(null)
  const { allBlockContent } = props.data
  const content = normalizeBlockContentNodes(allBlockContent?.nodes)
  useEffect(() => {
    fetchCases()
  }, [])
  
  function fetchCases() {
    // Fetch Use Cases from the WordPress REST API
    fetch('https://emergedigital.ae/wp-json/wp/v2/case-studies')
    .then(response => response.json())
    .then(data => {
     
      setCases(data)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }
  console.log("id", cases)
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
        <Cases cases={cases} />
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
