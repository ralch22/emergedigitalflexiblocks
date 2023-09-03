import React, { useState, useEffect } from 'react';
import { Container } from 'theme-ui'
import { graphql } from 'gatsby';
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import Header from '@solid-ui-blocks/Header/Block01'
import Content from '@solid-ui-blocks/Content/Block02'
import SingleBlog from '@solid-ui-blocks/SingleBlog/Block01'
import Footer from '@solid-ui-blocks/Footer/Block01'

import { normalizeBlockContentNodes } from '@blocks-helpers'

import tornado from './assets/bg-page-header.jpg'

const styles = {
    heroContainer: {
        background: `url(${tornado}) no-repeat`,
        width: "100%",
        height: "50vh"
    }
}

const SinglePost = props => {
    console.log(props)
  const { allBlockContent, wpPost } = props.data
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
      <SingleBlog content={content['blog']} post={wpPost} /> {/* Pass fetched posts */}
    </Container>
    <Divider space='5' />
    <Footer content={content['footer']} />
  </Layout>
  )
}


export const query = graphql`
  query innerpageSingleBlockContent($id: String) {
    allBlockContent(
      filter: { page: { in: ["innerpage/blog", "shared"] } }
    ) {
      nodes {
        ...BlockContent
      }
    }
    wpPost(id: { eq: $id }) {
        id
        title
        slug
        date
        content
        excerpt
        featuredImage {
          node {
            altText
            id
            sourceUrl
          }
        }
        categories {
          nodes {
            name
          }
        }
        author {
          node {
            id
            avatar {
              url
            }
            name
          }
        }
    }
  }


`

export default SinglePost