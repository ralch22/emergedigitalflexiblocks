/**
 * Placeholder component to shadow
 */

import React from 'react';
import Layout from '@solid-ui-layout/Layout';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import Footer from '@solid-ui-blocks/Footer/Block01';
import Header from '@solid-ui-blocks/Header/Block01';
import { Box, Grid, Text } from 'theme-ui';
import Divider from '@solid-ui-components/Divider';

export default function RenderPost({ data: { allBlockContent }, ...props }) {
  const { pageContext: { post, services = {} } = {} } = props;
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  console.log('pp', post);
  return (
    <Layout {...props}>
      <head dangerouslySetInnerHTML={{ __html: post.yoast_head }} />
      <Header search content={content['header']} />
      <Divider />
      <Grid columns={[1, 2]} gap={2}>
        <Box>
          <img alt={post.name} src={post.images[0].src} />
        </Box>
        <Box>
          <Text variant="h2" dangerouslySetInnerHTML={{ __html: post.name }} />
        </Box>
      </Grid>
      <Footer content={content['footer']} />
    </Layout>
  );
}
