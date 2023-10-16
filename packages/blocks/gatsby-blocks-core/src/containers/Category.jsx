import React from 'react';
import Layout from '@solid-ui-layout/Layout';
import Stack from '@solid-ui-layout/Stack/Stack';
import Main from '@solid-ui-layout/Main/Main';
import PageTitle from '@solid-ui-components/PageTitle';
import CardList from '@solid-ui-components/CardList';
import Divider from '@solid-ui-components/Divider';

const PageCollection = ({ data: { category, allBlockContent }, ...props }) => (
  <Layout {...props}>
    {/*<Seo title={category.name} description={category.description} />*/}
    <Divider />
    <Stack effectProps={{ effect: 'fadeInDown' }}>
      <PageTitle
        header={category.name}
        subheader={category.title}
        running={category.description}
        totalCount={category.posts.nodes.length}
      />
    </Stack>
    <Divider />
    <Stack>
      <Main>
        {category.posts.nodes && (
          <CardList
            nodes={category.posts.nodes}
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
    {/*<PreFooter>*/}
    {/*  <Pagination {...posts.pageInfo} {...category} />*/}
    {/*</PreFooter>*/}
  </Layout>
);

export default PageCollection
