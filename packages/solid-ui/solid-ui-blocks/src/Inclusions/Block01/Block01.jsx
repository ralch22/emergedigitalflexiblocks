import React from 'react';
import { Box, Card, Container, Flex } from 'theme-ui';
import Reveal from '@solid-ui-components/Reveal';
import Divider from '@solid-ui-components/Divider';
import ContentText from '@solid-ui-components/ContentText';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';

const styles = {
  avatar: {
    size: 120,
    display: `block`,
    bg: `omegaLighter`,
    borderTopColor: `omegaLighter`,
    borderTopWidth: `lg`,
    borderTopStyle: `solid`,
    borderRadius: `full`,
    boxSizing: `content-box`,
    mx: `auto`,
    mt: -90,
    mb: 3,
  },
};

const Inclusions = ({ content: { text, collection } }) => (
  <Container>
    <Box sx={{ textAlign: `center` }}>
      <ContentText content={text} />
    </Box>
    <Divider />
    <Divider />
    <Flex sx={{ mx: -3, flexWrap: `wrap` }}>
      {collection?.map(({ container, avatar, text }, index) => (
        <Box
          key={`item-${index}`}
          sx={{ flexBasis: [`1`, null, `1/2`, `1/3`], flexGrow: 1, p: 3 }}
        >
          <Reveal effect="fadeInLeft" delay={0.25 * (index + 2)}>
            <Card>{text}</Card>
          </Reveal>
        </Box>
      ))}
    </Flex>
  </Container>
);

export default WithDefaultContent(Inclusions)
