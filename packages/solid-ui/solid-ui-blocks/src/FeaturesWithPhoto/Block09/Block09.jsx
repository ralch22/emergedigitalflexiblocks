import React from 'react';
import { Box, Container, Flex } from 'theme-ui';
import Divider from '@solid-ui-components/Divider';
import FlexImage from '@solid-ui-components/FlexImage';
import FlexContent from '@solid-ui-components/FlexContent';
import ContentImages from '@solid-ui-components/ContentImages';
import ContentButtons from '@solid-ui-components/ContentButtons';
import ContentText from '@solid-ui-components/ContentText';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';

const FeaturesWithPhotoBlock01 = ({
  content: { text, images, collection, buttons, gradient },
  reverse,
  reverseSm,
  column,
  dangerously,
}) => (
  <Box>
    <Container wide sx={{ position: `relative` }}>
      <Flex
        sx={{
          alignItems: [null, `center`],
          justifyContent: 'space-between',
          flexDirection: [
            reverse || reverseSm ? `column-reverse` : `column`,
            reverse || reverseSm ? `column-reverse` : `column`,
            reverse || reverseSm ? `column-reverse` : `column`,
            reverse
              ? `${column ? 'column-reverse' : 'row-reverse'}`
              : `${column ? 'column' : 'row'}`,
          ],
          mx: [null, null, null, -4],
        }}
      >
        <FlexContent reverse={reverse}>
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
          {buttons && (
            <Box sx={{ textAlign: [`center`, `left`] }}>
              <Divider space={3} />
              <ContentButtons content={buttons} />
            </Box>
          )}
        </FlexContent>
        {reverseSm && <Divider />}
        <FlexImage reverse={reverse}>
          <ContentImages content={{ images }} reverse={reverse} />
        </FlexImage>
      </Flex>
    </Container>
  </Box>
);

export default WithDefaultContent(FeaturesWithPhotoBlock01)
