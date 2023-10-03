import React from 'react';
import { Link } from 'gatsby';
import { Box, Badge, css, Flex } from 'theme-ui';
import rv from '@solid-ui-components/utils/buildResponsiveVariant';
import getReadableColor from '@solid-ui-components/utils/getReadableColor';

const styles = {
  badge: {
    mb: 3,
  },
};

const CardBodyCategory = ({ variant, on_sale, omitCategory }) => (
  <Flex>
    {on_sale && (
      <Box
        css={css(styles.badge)}
        sx={{ variant: rv(variant, 'category'), mr: 2 }}
      >
        <Badge variant="tag">Sale!</Badge>
      </Box>
    )}
  </Flex>
);

export default CardBodyCategory;
