import React from 'react';
import Layout from '@solid-ui-layout/Layout';
import Stack from '@solid-ui-layout/Stack/Stack';
import Main from '@solid-ui-layout/Main/Main';
import Footer from '@solid-ui-blocks/Footer/Block01';
import Header from '@solid-ui-blocks/Header/Block01';
import Divider from '@solid-ui-components/Divider';
import PageTitle from '@solid-ui-components/PageTitle';
import Seo from 'gatsby-plugin-wpgraphql-seo';
import AuthorExpanded from '@solid-ui-blocks/AuthorExpanded';
import InfiniteLoopPagination from '@solid-ui-blocks/InfiniteScroller';
import { normalizeBlockContentNodes } from '@blocks-helpers';

const PageCollectionAuthors = ({
  data: { author, wpUser, allBlockContent },
  ...props
}) => {
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  return (
    <Layout {...props}>
      <Seo post={wpUser} />
      <Header search content={content['header']} />
      <Divider space="5" />
      <Stack effectProps={{ effect: 'fadeInDown' }}>
        <PageTitle
          header="Published by Author"
          totalCount={author.posts.nodes.length}
        />
      </Stack>
      <Divider />
      <Stack>
        <Main>
          <AuthorExpanded author={author} />
          <Divider />
          <InfiniteLoopPagination data={author.posts.nodes} />
        </Main>
      </Stack>
      <Divider />

      <Footer content={content['footer']} />
    </Layout>
  );
};

export default PageCollectionAuthors
