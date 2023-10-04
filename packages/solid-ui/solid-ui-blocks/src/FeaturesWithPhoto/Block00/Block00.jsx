import React, { Fragment } from 'react';
import { Box, Container, Flex } from 'theme-ui';
import Divider from '@solid-ui-components/Divider';
import FlexImage from '@solid-ui-components/FlexImage';
import FlexContent from '@solid-ui-components/FlexContent';
import FlexOverlapFade from '@solid-ui-components/FlexOverlapFade';
import ContentButtons from '@solid-ui-components/ContentButtons';
import ContentText from '@solid-ui-components/ContentText';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';
import CardListSlider from './CardList.Slider';

const FeaturesWithPhotoBlock00 = ({
  content: { text, images, collection, buttons },
  reverse,
}) => (
  <Container sx={{ position: `relative` }}>
    <Flex
      sx={{
        alignItems: [null, `center`],
        flexDirection: [
          reverse ? `column-reverse` : `column`,
          reverse ? `row-reverse` : `row`,
        ],
        mx: [null, null, null, -4],
      }}
    >
      <FlexContent reverse={reverse}>
        <Box sx={{ textAlign: ['center', 'left'] }}>
          <ContentText content={text?.[0]} />
          <ContentText dangerously content={text?.[1]} />
        </Box>
        {buttons && (
          <>
            <Divider space={3} />
            <ContentButtons content={buttons} />
          </>
        )}
      </FlexContent>
      <FlexImage reverse={reverse}>
        <CardListSlider />
      </FlexImage>
    </Flex>
    <FlexOverlapFade direction={reverse ? 'ltr' : 'rtl'} />
  </Container>
);

export default WithDefaultContent(FeaturesWithPhotoBlock00);
