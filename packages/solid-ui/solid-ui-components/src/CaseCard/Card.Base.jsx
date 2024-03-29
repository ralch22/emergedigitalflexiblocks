import React from 'react';
import { Box, Card, Flex } from 'theme-ui';
import rv from '@solid-ui-components/utils/buildResponsiveVariant';
import columnSizeMatcher from '@solid-ui-components/utils/columnSizeMatcher';
import Body from './Card.Body';
import Footer from './Card.Footer';
import Media from './Card.Media';

const styles = {
  card: {
    overflow: `hidden`,
    height: `full`,
  },
  content: {
    alignItems: `stretch`,
    height: `full`,
  },
};

const CardBase = ({ columns, withModerate, onMouseOver, ...props }) => (
  <Box
    className="blog_card"
    sx={columnSizeMatcher(columns)}
    onMouseOver={onMouseOver}
    onFocus={onMouseOver}
  >
    <Card
      variant="interactive"
      sx={{
        ...styles.card,
        variant: rv(props.variant, 'card'),
      }}
    >
      <Flex
        as="article"
        sx={{
          ...styles.content,
          variant: rv(props.variant, 'content'),
        }}
      >
        <Media withModerate {...props} />
        <Body {...props}>
          <Footer {...props} />
        </Body>
      </Flex>
    </Card>
  </Box>
);

export default CardBase;
