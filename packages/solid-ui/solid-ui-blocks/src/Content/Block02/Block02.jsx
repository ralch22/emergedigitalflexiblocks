import React from 'react';
import { Box, Flex } from 'theme-ui';
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
