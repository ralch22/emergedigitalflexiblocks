/**
 * Placeholder component to shadow
 */

import React, { useEffect } from 'react';
import { Box, Card } from 'theme-ui';
import Layout from '@solid-ui-layout/Layout';
import Stack from '@solid-ui-layout/Stack/Stack';
import Main from '@solid-ui-layout/Main/Main';
import Footer from '@solid-ui-blocks/Footer/Block01';
import Header from '@solid-ui-blocks/Header/Block01';
import CardList from '@solid-ui-components/CardList';
import Divider from '@solid-ui-components/Divider';
import Sticky from '@solid-ui-components/Sticky';
import Seo from 'gatsby-plugin-wpgraphql-seo';
import AuthorCompact from '@solid-ui-blocks/AuthorCompact';
import TableOfContentsCompact from '@solid-ui-blocks/TableOfContentsCompact';
import {
  PostBody,
  PostComments,
  PostCommentsFacebook,
  PostCommentsGraph,
  PostFooter,
  PostHead,
  PostImage,
  PostTagsShare,
} from '@solid-ui-blocks/Post';
import { normalizeBlockContentNodes } from '@blocks-helpers';

export default function Post({
  data: {
    post,
    tagCategoryPosts,
    tagPosts,
    categoryPosts,
    previous,
    next,
    allBlockContent,
    wpPost,
  },
  ...props
}) {
  useEffect(() => {
    const removeComments = () => {
      const elementsToRemove = document.querySelector('.comment');

      elementsToRemove && elementsToRemove.remove();
    };

    // Call the function when the component mounts (page loads)
    removeComments();
  }, []);
  const relatedPosts = [
    ...(tagCategoryPosts ? tagCategoryPosts.nodes : []),
    ...(tagPosts ? tagPosts.nodes : []),
    ...(categoryPosts ? categoryPosts.nodes : []),
  ];
  const { pageContext: { services = {}, siteUrl } = {} } = props;

  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  return (
    <Layout {...props}>
      <Seo post={wpPost} />
      <Header search content={content['header']} />
      <Divider space="5" />
      <div style={{ marginTop: `5rem` }}>
        <Stack effectProps={{ effect: 'fadeInDown' }}>
          <PostHead {...post} />
        </Stack>
      </div>
      <Divider />
      <Stack effectProps={{ effect: 'fadeInUp' }}>
        <Main>
          <Card variant="paper">
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
        <Box sx={{ pl: `3`, flexBasis: `1/4`, display: ['none', `block`] }}>
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
              title="Related Posts"
              nodes={relatedPosts}
              variant="horizontal-aside"
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
  );
}
