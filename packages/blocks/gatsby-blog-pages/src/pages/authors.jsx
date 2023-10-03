import React from 'react';
import { Layout, Stack, Main } from '@solid-ui-layout';
import PageTitle from '@solid-ui-components/PageTitle';
import Divider from '@solid-ui-components/Divider';
import Seo from '@solid-ui-blocks/Seo';
import AuthorExpanded from '@solid-ui-blocks/AuthorExpanded';

const PageAuthors = props => {
  return (
    <Layout {...props}>
      <Seo title="Our Team" />
      <Divider />
      <Stack effectProps={{ effect: 'fadeInDown' }}>
        <PageTitle
          header="Team Members"
          subheader="FlexiBlog theme comes with a pre-made contact form component. You can integrate this form with serverless services such as Formspree, Getform, FormKeep and others to receive form submissions via email."
        />
      </Stack>
      <Stack>
        <Main>
          {authors.map((author, i) => (
            <React.Fragment key={`item-${i}`}>
              <Divider />
              <AuthorExpanded author={author} withLink />
            </React.Fragment>
          ))}
        </Main>
      </Stack>
    </Layout>
  );
};

export default PageAuthors;
