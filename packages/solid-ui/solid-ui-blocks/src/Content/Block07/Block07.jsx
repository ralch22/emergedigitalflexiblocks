import React from 'react';
import { Box, Container } from 'theme-ui';
import Divider from '@solid-ui-components/Divider';
import ContentText from '@solid-ui-components/ContentText';
import ContentButtons from '@solid-ui-components/ContentButtons';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';

const ContentBlock01 = ({ content: { text, buttons } }) => (
  <Container>
    <Box
      sx={{
        flexBasis: [null, null, null, `2/5`],
        position: `relative`,
        textAlign: 'center',
      }}
    >
      <ContentText content={text} />
      {buttons && (
        <>
          <Divider space={2} />
          <ContentButtons content={buttons} />
        </>
      )}
    </Box>
  </Container>
);

export default WithDefaultContent(ContentBlock01);
