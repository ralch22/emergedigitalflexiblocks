import React from 'react';
import { Box } from 'theme-ui';
import Reveal from '@solid-ui-components/Reveal';
import ContentText from '@solid-ui-components/ContentText';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';

const ContentBlock08 = ({ content: { text } }) => (
  <Reveal effect="fadeInLeft">
    <Box
      sx={{
        flexBasis: [null, null, null, `2/5`],
        position: `relative`,
        textAlign: 'center',
      }}
    >
      <ContentText content={text} />
    </Box>
  </Reveal>
);

export default WithDefaultContent(ContentBlock08);
