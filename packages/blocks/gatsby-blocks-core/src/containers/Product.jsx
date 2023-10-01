/**
 * Placeholder component to shadow
 */

import React from 'react'
import Layout from '@solid-ui-layout/Layout'

import Footer from '@solid-ui-blocks/Footer/Block01'
import Header from '@solid-ui-blocks/Header/Block01'
import { Grid } from 'theme-ui'
import Divider from '@solid-ui-components/Divider'
import Seo from '@solid-ui-blocks/Seo'

export default function RenderPost(props) {
  const { pageContext: { post, services = {} } = {} } = props
  console.log('pp', post)
  return (
    <Layout {...props}>
      <Seo title='Home' />
      <Header search content={content['header']} />
      <Divider />
      <Grid columns={[1, 2]} gap={2}></Grid>
      <Footer content={content['footer']} />
    </Layout>
  )
}
