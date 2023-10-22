import React from 'react';
import Layout from '@solid-ui-layout/Layout';
import Stack from '@solid-ui-layout/Stack/Stack';
import Main from '@solid-ui-layout/Main/Main';
import Footer from '@solid-ui-blocks/Footer/Block01';
import Header from '@solid-ui-blocks/Header/Block01';
import PageTitle from '@solid-ui-components/PageTitle';
import CardList from '@solid-ui-components/CardList';
import Divider from '@solid-ui-components/Divider';
import Seo from 'gatsby-plugin-wpgraphql-seo';
import { normalizeBlockContentNodes } from '@blocks-helpers';

const PageCollection = ({
  data: { category, allBlockContent, wpCategory },
  ...props
}) => {
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  return (
    <Layout {...props}>
      <Seo post={wpCategory} />
      <Header content={content['header']} />
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
      <Footer content={content['footer']} />
    </Layout>
  );
};

export default PageCollection
