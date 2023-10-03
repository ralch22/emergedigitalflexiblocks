import React from 'react';
import { Container, Flex, Box, css } from 'theme-ui';
import Reveal from '@solid-ui-components/Reveal';
import Divider from '@solid-ui-components/Divider';
import ContentText from '@solid-ui-components/ContentText';
import ContentButtons from '@solid-ui-components/ContentButtons';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';

const ContentBlock01 = ({ content: { collection }, reverse }) => (
  <Container>
    <Box
      sx={{
        flexBasis: [null, null, null, `2/5`],
        [reverse ? 'ml' : 'mr']: [null, null, null, 5],
        position: `relative`,
        textAlign: 'center',
      }}
    >
      {collection?.[0] && (
        <Reveal effect="fadeInLeft">
          <Box sx={{ textAlign: 'center' }}>
            <ContentText content={collection[0]?.text} />
          </Box>
          {collection[0]?.buttons && (
            <>
              <Divider space={3} />
              <Reveal
                effect="fadeInRight"
                delay={1}
                css={css({ mb: [4, null, null, 0] })}
              >
                <ContentButtons content={collection[0].buttons} />
              </Reveal>
            </>
          )}
        </Reveal>
      )}
    </Box>
  </Container>
);

export default WithDefaultContent(ContentBlock01);
