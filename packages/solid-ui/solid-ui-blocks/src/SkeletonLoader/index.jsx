import React from 'react';
import { Flex, Spinner } from 'theme-ui';

const BlogPostLoaderRow = () => {
  return (
    <Flex sx={{ height: '100vh' }}>
      <Spinner size="60" />
    </Flex>
  );
};

export default BlogPostLoaderRow;
