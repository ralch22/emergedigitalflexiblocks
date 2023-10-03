import React from 'react';
import { Container, Flex, Box, css } from 'theme-ui';
import Reveal from '@solid-ui-components/Reveal';
import Divider from '@solid-ui-components/Divider';
import ContentText from '@solid-ui-components/ContentText';
import ContentImages from '@solid-ui-components/ContentImages';
import ListItem from '@solid-ui-components/ListItem';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';

const styles = {
  listItem: {
    flexBasis: [`100%`, `1/2`, null, `1/3`],
    alignItems: `center`,
    justifyContent: `left`,
    p: 4,
    background: '#fff',
    mb: 4,
    borderRadius: '1rem',
  },
};

const FeaturesBlock01 = ({ content: { text, collection, images } }) => (
  <Container as={Reveal}>
    <Box sx={{ textAlign: `center` }}>
      <ContentText content={text} />
    </Box>
    <Flex
      sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
    >
      <ContentImages sx={{ maxWidth: '300px' }} content={{ images }} />
    </Flex>

    {collection && (
      <>
        <Divider space="1" />
        <Flex
          sx={{
            flexWrap: `wrap`,
            mx: -3,
            flexDirection: [`column`, null, `column`],
          }}
        >
          {collection?.map((props, index) => (
            <Reveal
              key={`item-${index}`}
              effect="fadeInGrow"
              delay={0.15 * (index + 1)}
              css={css(styles.listItem)}
            >
              <ListItem {...props} iconProps={{ size: 'sm' }} center />
            </Reveal>
          ))}
        </Flex>
      </>
    )}
  </Container>
);

export default WithDefaultContent(FeaturesBlock01);
