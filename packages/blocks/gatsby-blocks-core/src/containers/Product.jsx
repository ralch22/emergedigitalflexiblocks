/**
 * Placeholder component to shadow
 */

import React, { useEffect } from 'react'
import { Card, Box  } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Stack from '@solid-ui-layout/Stack/Stack'
import Main from '@solid-ui-layout/Main/Main'
import Footer from '@solid-ui-blocks/Footer/Block01';
import Header from '@solid-ui-blocks/Header/Block01';
import CardList from '@solid-ui-components/CardList'
import Divider from '@solid-ui-components/Divider'
import Sticky from '@solid-ui-components/Sticky'
import Seo from '@solid-ui-blocks/Seo'
import AuthorCompact from '@solid-ui-blocks/AuthorCompact'
import TableOfContentsCompact from '@solid-ui-blocks/TableOfContentsCompact'
import {
  PostHead,
  PostImage,
  PostBody,
  PostComments,
  PostCommentsFacebook,
  PostCommentsGraph,
  PostTagsShare,
  PostFooter
} from '@solid-ui-blocks/Post'
import { normalizeBlockContentNodes } from '@blocks-helpers';



export default function Post({
    data: { allBlockContent },
    pageContext: { product },
    ...props
  }) {
    // useEffect(() => {
    //   typeof document !== 'undefined' ? document.location.reload() : null
    // }, []);
    const relatedPosts = [
        ...(tagCategoryPosts ? tagCategoryPosts.nodes : []),
        ...(tagPosts ? tagPosts.nodes : []),
        ...(categoryPosts ? categoryPosts.nodes : [])
      ]
      const { pageContext: { services = {}, siteUrl } = {} } = props

      const content = normalizeBlockContentNodes(allBlockContent?.nodes);
      return (
        <Layout {...props}>
          <Seo {...product} siteUrl={siteUrl} />
          <Header search content={content['header']} />
          <div style={{ marginTop: `5rem` }}>

            <Stack  effectProps={{ effect: 'fadeInDown' }}>
            
              <PostHead {...product} />
            </Stack>
          </div>
          <Divider />
          <Stack effectProps={{ effect: 'fadeInUp' }}>
            <Main>
              <Card variant='paper'>
                <PostImage {...product} inCard />
                <PostBody {...product} />
                <PostTagsShare {...product} location={props.location} />
                {services.disqus && <PostComments {...product} />}
                {services.graphComment && <PostCommentsGraph {...product} />}
                {services.facebookComment && (
                  <PostCommentsFacebook {...product} siteUrl={siteUrl} />
                )}
                <PostFooter {...{ previous, next }} />
              </Card>
            </Main>
            <Box sx={{ pl: `3`, flexBasis: `1/4`, display: ['none', `block`]}}>
              <AuthorCompact author={product.author.node} omitTitle />
              <Divider />
              <Sticky>
                {product.tableOfContents?.items && (
                  <>
                    <TableOfContentsCompact {...product} />
                    <Divider />
                  </>
                )}
                <CardList
                  title='Related Posts'
                  nodes={relatedPosts}
                  variant='horizontal-aside'
                  limit={6}
                  omitMedia
                  omitCategory
                  distinct
                  aside
                />
        
              </Sticky>
            </Box>
          </Stack>
          <Divider />
          <Footer content={content['footer']} />
        </Layout>
      )
}
