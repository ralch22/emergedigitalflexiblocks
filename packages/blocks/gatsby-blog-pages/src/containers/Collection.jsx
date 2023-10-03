import React from 'react';
import { Layout, Stack, Main, PreFooter } from '@solid-ui-layout';
import PageTitle from '@solid-ui-components/PageTitle';
import Pagination from '@solid-ui-components/Pagination';
import CardList from '@solid-ui-components/CardList';
import Divider from '@solid-ui-components/Divider';
import Seo from '@solid-ui-blocks/Seo';

const PageCollection = ({ data: { posts, collectionInfo }, ...props }) => (
  <Layout {...props}>
    <Seo title={collectionInfo.name} description={collectionInfo.description} />
    <Divider />
    <Stack effectProps={{ effect: 'fadeInDown' }}>
      <PageTitle
        header={collectionInfo.name}
        subheader={collectionInfo.title}
        running={collectionInfo.description}
        totalCount={posts.totalCount}
      />
    </Stack>
    <Divider />
    <Stack>
      <Main>
        {posts.nodes && (
          <CardList
            nodes={posts.nodes}
            variant={['horizontal-md', 'vertical']}
            columns={[1, 2, 3, 3]}
            omitCategory={
              props.pageContext &&
              props.pageContext.collectionType === 'category'
            }
          />
        )}
      </Main>
    </Stack>
    <Divider />
    <PreFooter>
      <Pagination {...posts.pageInfo} {...collectionInfo} />
    </PreFooter>
  </Layout>
);

export default PageCollection;
