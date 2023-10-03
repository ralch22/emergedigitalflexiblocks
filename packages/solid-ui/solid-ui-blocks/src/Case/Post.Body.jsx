import React from 'react';
import { Box, Text } from 'theme-ui';

const styles = {
  excerpt: {
    flex: `auto`,
    mb: 3,
  },
};

export const PostBody = ({ content }) => {
  return (
    <Box>
      <Text
        variant="medium"
        sx={{
          ...styles.excerpt,
        }}
        dangerouslySetInnerHTML={{ __html: content.rendered }}
      />
    </Box>
  );
};
