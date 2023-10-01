/**
 * Placeholder component to shadow
 */

import React, { useEffect } from 'react'
import Layout from '@solid-ui-layout/Layout'
import { graphql } from 'gatsby'
import { Container } from 'theme-ui'
import Footer from '@solid-ui-blocks/Footer/Block01'
import Header from '@solid-ui-blocks/Header/Block01'
import Divider from '@solid-ui-components/Divider'
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01'
import ModalSimple from '@solid-ui-blocks/Modal/Block02'
import ModalCart from '@solid-ui-blocks/Modal/Block03'
import Seo from '@solid-ui-blocks/Seo'
import Cases from '@solid-ui-blocks/Cases/Block01'
import Content from '@solid-ui-blocks/Content/Block01'
import styles from './_styles'

import { useDispatch, useSelector } from 'react-redux'
import { fetchCaseStudies } from '../store/ducks/caseSlice'

import { normalizeBlockContentNodes } from '@blocks-helpers'

const auth = typeof window !== 'undefined' ? localStorage.getItem('auth') : null
const parsedData = JSON.parse(auth)

const CaseStudiesList = ({ data: { allBlockContent }, ...props }) => {
  const content = normalizeBlockContentNodes(allBlockContent?.nodes)
  const dispatch = useDispatch()
  const { caseStudies, status, error } = useSelector(state => state.case)

  useEffect(() => {
    dispatch(fetchCaseStudies())
  }, [dispatch])

  return (
    <Layout {...props}>
      <Seo title='Home' />
      <Header content={content['header']} />
      <ModalWithTabs content={content['authentication']} reverse />
      <ModalWithTabs content={content['contact']} />
      <ModalSimple content={content['advertisement']} />
      <ModalCart content={content['cart']} />
      <Container variant='wide' sx={styles.heroContainer}>
        <Content pageTitle='hello' content={content['hero']} />
      </Container>
      <Divider />
      <Divider spaceY='5' />
      <Cases cases={caseStudies} content={content['all-cases']} />

      <Footer content={content['footer']} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query PostsPageQuery {
    allBlockContent(filter: { page: { in: ["innerpage/blog", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
  }
`

export default CaseStudiesList
