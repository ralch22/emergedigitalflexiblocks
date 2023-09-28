/**
 * Placeholder component to shadow
 */

import React, { useEffect } from 'react'
import Layout from '@solid-ui-layout/Layout'
import Stack from '@solid-ui-layout/Stack/Stack'
import { graphql } from 'gatsby'
import Main from '@solid-ui-layout/Main/Main'
import Footer from '@solid-ui-blocks/Footer/Block01';
import Header from '@solid-ui-blocks/Header/Block01';
import { Box } from 'theme-ui'
import ProductList from '@solid-ui-components/ProductList'
import Divider from '@solid-ui-components/Divider'
import Seo from '@solid-ui-blocks/Seo'
import Products from '@solid-ui-blocks/Products/Block01'

import { normalizeBlockContentNodes } from '@blocks-helpers';

const auth = typeof window !== 'undefined' ? localStorage.getItem("auth") : null
const parsedData = JSON.parse(auth);

const RenderProduct = ({ data: { allBlockContent }, ...props}) => {

  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  const [caseStudy, setCaseStudy] = useState(null);
    
      useEffect(() => {
        async function fetchCaseStudy() {
          try {
            const response = await fetch(
              `https://emergedigital.ae/wp-json/wp/v2/case-studies`
            );
            setCaseStudy(response.data);
          } catch (error) {
            console.error('Error fetching case study:', error);
          }
        }
    
        fetchCaseStudy();
      }, []);

      console.log("studies", caseStudy)
  
  return (
    <Layout {...props}>
    <Seo title='Home' />
    <Header content={content['header']} />
    <Divider />
    {/* <Products products={products} content={content['latest-blogs']} /> */}
   
    <Footer content={content['footer']} />
  </Layout>
  )
}


export const pageQuery = graphql`
  query PostsPageQuery {
    allBlockContent(
      filter: { page: { in: ["innerpage/products", "shared"] } }
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

export default RenderProduct