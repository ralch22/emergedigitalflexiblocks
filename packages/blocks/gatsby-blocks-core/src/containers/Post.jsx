/**
 * Placeholder component to shadow
 */

import React from 'react'
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
    data: { post, tagCategoryPosts, tagPosts, categoryPosts, previous, next, allBlockContent },
    ...props
  }) {
    console.log("ds", post)
    const relatedPosts = [
        ...(tagCategoryPosts ? tagCategoryPosts.nodes : []),
        ...(tagPosts ? tagPosts.nodes : []),
        ...(categoryPosts ? categoryPosts.nodes : [])
      ]
      console.log("related", tagPosts)
      const { pageContext: { services = {}, siteUrl } = {} } = props

      const content = normalizeBlockContentNodes(allBlockContent?.nodes);
      return (
        <Layout {...props}>
          <Seo {...post} siteUrl={siteUrl} />
          <Header search content={content['header']} />
          <Divider spaceY={10} />
          <Stack effectProps={{ effect: 'fadeInDown' }}>
            <PostHead {...post} />
          </Stack>
          <Divider />
          <Stack effectProps={{ fraction: 0 }}>
            <Main>
              <Card variant='paper'>
                <PostImage {...post} inCard />
                <PostBody {...post} />
                <PostTagsShare {...post} location={props.location} />
                {services.disqus && <PostComments {...post} />}
                {services.graphComment && <PostCommentsGraph {...post} />}
                {services.facebookComment && (
                  <PostCommentsFacebook {...post} siteUrl={siteUrl} />
                )}
                <PostFooter {...{ previous, next }} />
              </Card>
            </Main>
            <Box sx={{ pl: `3`, flexBasis: `1/4` }}>
              <AuthorCompact author={post.author.node} omitTitle />
              <Divider />
              <Sticky>
                {post.tableOfContents?.items && (
                  <>
                    <TableOfContentsCompact {...post} />
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
