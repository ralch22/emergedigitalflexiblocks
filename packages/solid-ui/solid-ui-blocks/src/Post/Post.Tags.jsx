import React from 'react';
import { Badge, Box, Flex, Heading } from 'theme-ui';

const styles = {
  wrapper: {
    alignItems: `center`,
  },
  heading: {
    color: `omegaDark`,
    mr: 3,
    mb: 0,
  },
};

export const PostTags = ({ tags }) =>
  tags && tags.length > 0 ? (
    <Flex sx={styles.wrapper}>
      <Heading variant="h5" sx={styles.heading}>
        Tags
      </Heading>
      <Box variant="lists.badges">
        {tags.node.map(({ id, name, slug }) => (
          <Badge variant="tag-dark" key={id}>
            {name}
          </Badge>
        ))}
      </Box>
    </Flex>
  ) : null;
