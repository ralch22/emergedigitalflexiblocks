import React from 'react';
import { Box, Container, css, Flex } from 'theme-ui';
import Reveal from '@solid-ui-components/Reveal';
import Divider from '@solid-ui-components/Divider';
import ListItem from '@solid-ui-components/ListItem';
import FlexImage from '@solid-ui-components/FlexImage';
import FlexContent from '@solid-ui-components/FlexContent';
import ContentText from '@solid-ui-components/ContentText';
import ContentImages from '@solid-ui-components/ContentImages';
import ContentButtons from '@solid-ui-components/ContentButtons';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';

const FeaturesWithPhotoBlock02 = ({
  content: { text, images, collection, buttons, full },
  reverse,
}) => (
  <Container sx={{ position: `relative` }}>
    <Flex
      sx={{
        alignItems: [null, `center`],
        flexDirection: [
          reverse ? `column-reverse` : `column`,
          reverse ? `column-reverse` : `column`,
          reverse ? `column-reverse` : `column`,
          reverse ? `row-reverse` : `row`,
        ],
        mx: [null, null, null, -4],
      }}
    >
      <Box sx={{ flexBasis: '80%' }}>
        <FlexImage reverse={reverse}>
          <Box sx={{ textAlign: ['center', 'left'] }}>
            <ContentText content={text} />
          </Box>
          <ContentImages content={{ images }} reverse={reverse} />
        </FlexImage>
      </Box>
      <FlexContent reverse={reverse}>
        {collection && (
          <>
            <Divider space={3} />
            <Flex sx={{ flexWrap: `wrap`, maxWidth: 500, m: -2 }}>
              {collection.map((props, index) => (
                <Reveal
                  key={`item-${index}`}
                  effect="fadeInPop"
                  delay={1 + 0.2 * (index + 1)}
                  css={css({ flexBasis: [`1`, `1/3`, `1/3`, `1/2`] })}
                >
                  <Box py="3" m="2" px="3">
                    <ListItem {...props} full compact middle p="2" />
                  </Box>
                </Reveal>
              ))}
            </Flex>
          </>
        )}
        {buttons && (
          <Box sx={{ textAlign: [`center`, `left`] }}>
            <Divider space={3} />
            <ContentButtons content={buttons} />
          </Box>
        )}
      </FlexContent>
    </Flex>
  </Container>
);

export default WithDefaultContent(FeaturesWithPhotoBlock02)
