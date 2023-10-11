import React from 'react';
import { Box } from 'theme-ui';

const styles = {
  excerpt: {
    flex: `auto`,
    mb: 3,
  },
};

export const PostBody = ({ content }) => {
  return (
    <Box>
      <Box
        variant="medium"
        sx={{
          ...styles.excerpt,
        }}
        dangerouslySetInnerHTML={{ __html: `<div> ${content} </div>` }}
      />
    </Box>
  );
};
