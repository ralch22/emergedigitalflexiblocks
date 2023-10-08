import React from 'react';
import Layout from '@solid-ui-layout/Layout';
import Stack from '@solid-ui-layout/Stack/Stack';
import Main from '@solid-ui-layout/Main/Main';
import Divider from '@solid-ui-components/Divider';
import PageTitle from '@solid-ui-components/PageTitle';
import Seo from 'gatsby-plugin-wpgraphql-seo';
import AuthorExpanded from '@solid-ui-blocks/AuthorExpanded';
import InfiniteLoopPagination from '@solid-ui-blocks/InfiniteScroller';

const PageCollectionAuthors = ({ data: { author, wpUser }, ...props }) => {
  return (
    <Layout {...props}>
      <Seo post={wpUser} />
      <Divider />
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

      {/*<PreFooter>*/}
      {/*  /!*<Pagination {...posts.pageInfo} {...collectionInfo} />*!/*/}
      {/*</PreFooter>*/}
    </Layout>
  );
};

export default PageCollectionAuthors
