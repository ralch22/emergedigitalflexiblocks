import React from 'react';
import { Container, Flex, Box, css } from 'theme-ui';
import Reveal from '@solid-ui-components/Reveal';
import Divider from '@solid-ui-components/Divider';
import ContentText from '@solid-ui-components/ContentText';
import ContentButtons from '@solid-ui-components/ContentButtons';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';

const ContentBlock02 = ({ content, pageTitle }) => {
  return (
    <Box sx={{ height: '50vh' }}>
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <h2>{pageTitle}</h2>
      </Flex>
    </Box>
  );
};

export default WithDefaultContent(ContentBlock02);
