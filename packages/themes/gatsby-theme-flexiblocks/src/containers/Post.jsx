import React from 'react'
import { Card as CardComponent } from 'theme-ui'
import { Layout, Stack, Main, Sidebar } from '@solid-ui-layout'
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

const Post = ({
  data: { post, tagCategoryPosts, tagPosts, categoryPosts, previous, next },
  ...props
}) => { 
  const relatedPosts = [
    ...(tagCategoryPosts ? tagCategoryPosts.nodes : []),
    ...(tagPosts ? tagPosts.nodes : []),
    ...(categoryPosts ? categoryPosts.nodes : [])
  ]
  const { pageContext: { services = {}, siteUrl } = {} } = props

  return (
    <Layout {...props}>
      <Seo {...post} siteUrl={siteUrl} />
      <Divider />
      <Stack effectProps={{ effect: 'fadeInDown' }}>
        <PostHead {...post} />
      </Stack>
      <Divider />
      <Stack effectProps={{ fraction: 0 }}>
        <Main>
          <CardComponent variant='paper'>
            <PostImage {...post} inCard />
            <PostBody {...post} />
            <PostTagsShare {...post} location={props.location} />
            {services.disqus && <PostComments {...post} />}
            {services.graphComment && <PostCommentsGraph {...post} />}
            {services.facebookComment && (
              <PostCommentsFacebook {...post} siteUrl={siteUrl} />
            )}
            <PostFooter {...{ previous, next }} />
          </CardComponent>
        </Main>
        <Sidebar>
          <AuthorCompact author={post.author} omitTitle />
          <Divider />
          <Sticky>
            {post.tableOfContents?.items && (
              <>
                <TableOfContentsCompact {...post} />
                <Divider />
              </>
            )}
            {post.category && (
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
            )}
          </Sticky>
        </Sidebar>
      </Stack>
    </Layout>
  )
}

export default Post
