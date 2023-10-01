/**
 * Placeholder component to shadow
 */

import React from 'react'
import Layout from '@solid-ui-layout/Layout'
import { normalizeBlockContentNodes } from '@blocks-helpers'
import Footer from '@solid-ui-blocks/Footer/Block01'
import Header from '@solid-ui-blocks/Header/Block01'
import { Grid } from 'theme-ui'
import Divider from '@solid-ui-components/Divider'
import Seo from '@solid-ui-blocks/Seo'

export default function RenderPost({ data: { allBlockContent }, ...props }) {
  const { pageContext: { post, services = {} } = {} } = props
  const content = normalizeBlockContentNodes(allBlockContent?.nodes)
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
