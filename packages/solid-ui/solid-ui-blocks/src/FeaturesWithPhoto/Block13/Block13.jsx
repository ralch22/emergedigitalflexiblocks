import React from 'react';
import { Box, Container, Flex } from 'theme-ui';
import Divider from '@solid-ui-components/Divider';
import FlexContent from '@solid-ui-components/FlexContent';
import ContentImages from '@solid-ui-components/ContentImages';
import ContentButtons from '@solid-ui-components/ContentButtons';
import ContentText from '@solid-ui-components/ContentText';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';

const FeaturesWithPhotoBlock01 = ({
  content: { text, images, simpleImg, collection, buttons, gradient },
  reverse,
  dangerously,
  column,
}) => (
  <Box
    sx={{
      background: gradient
        ? 'linear-gradient(90deg, #336567 0%, #3F2B56 100%)'
        : '',
      width: '100%',
    }}
  >
    <Container wide sx={{ position: `relative` }}>
      <Flex
        sx={{
          alignItems: [null, `center`],
          flexDirection: ['column'],
          mx: [null, null, null, -4],
        }}
      >
        <FlexContent reverse={reverse}>
          <ContentImages content={{ images }} reverse={reverse} />
          {dangerously ? (
            <Box sx={{ textAlign: ['center', 'left'] }}>
              <ContentText content={text?.[0]} />
              <ContentText dangerously content={text?.[1]} />
            </Box>
          ) : (
            <Box sx={{ textAlign: ['center', 'left'] }}>
              <ContentText content={text} />
            </Box>
          )}
        </FlexContent>
        <FlexContent reverse={reverse}>
          {buttons && (
            <Box sx={{ textAlign: [`center`, `left`], mt: 3 }}>
              <Divider space={3} />
              <ContentButtons content={buttons} />
            </Box>
          )}
        </FlexContent>
      </Flex>
    </Container>
  </Box>
);

export default WithDefaultContent(FeaturesWithPhotoBlock01);
