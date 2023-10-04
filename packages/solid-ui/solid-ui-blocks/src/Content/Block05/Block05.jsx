import React from 'react';
import { Box, Container } from 'theme-ui';
import ContentText from '@solid-ui-components/ContentText';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';

const ContentBlock01 = ({ content: { text } }) => (
  <Container>
    <Box sx={{ textAlign: `center` }}>
      <ContentText content={text} />
    </Box>
  </Container>
);

export default WithDefaultContent(ContentBlock01);
