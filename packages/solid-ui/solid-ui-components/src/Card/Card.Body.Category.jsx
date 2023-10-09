import React from 'react';
import { Link } from 'gatsby';
import { Badge, Box, css, Flex } from 'theme-ui';
import rv from '@solid-ui-components/utils/buildResponsiveVariant';

const styles = {
  badge: {
    mb: 3,
  },
};

const CardBodyCategory = ({ variant, categories, omitCategory }) => (
  <Flex>
    {categories.nodes.map(({ name, slug }) => {
      return (
        <Box
          css={css(styles.badge)}
          sx={{ variant: rv(variant, 'category'), mr: 2 }}
        >
          <Badge variant="tag" as={Link} to={`/category/${slug}`}>
            {name}
          </Badge>
        </Box>
      );
    })}
  </Flex>
);

export default CardBodyCategory;
