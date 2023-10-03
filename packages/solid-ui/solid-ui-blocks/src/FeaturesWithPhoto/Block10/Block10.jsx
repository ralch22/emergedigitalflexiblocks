import React, { Fragment } from 'react';
import { Container, Flex, Box } from 'theme-ui';
import Reveal from '@solid-ui-components/Reveal';
import Divider from '@solid-ui-components/Divider';
import ListItem from '@solid-ui-components/ListItem';
import FlexImage from '@solid-ui-components/FlexImage';
import FlexContent from '@solid-ui-components/FlexContent';
import FlexOverlapFade from '@solid-ui-components/FlexOverlapFade';
import ContentImages from '@solid-ui-components/ContentImages';
import ContentButtons from '@solid-ui-components/ContentButtons';
import ContentText from '@solid-ui-components/ContentText';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';
import VideoPlayer from '@solid-ui-components/Video/Video';

const FeaturesWithPhotoBlock01 = ({
  content: { text, images, collection, buttons, gradient },
  reverse,
}) => (
  <Box sx={{ position: `relative` }}>
    <Box sx={{ textAlign: ['center', 'left'] }}>
      <ContentText content={text} />
    </Box>
    <VideoPlayer>
      <iframe
        width="555"
        height="312"
        src="https://www.youtube.com/embed/bDI_oXgb0EI"
        title="Natasha, your personal app builder"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </VideoPlayer>
    {buttons && (
      <Box sx={{ textAlign: [`center`, `left`] }}>
        <Divider space={3} />
        <ContentButtons content={buttons} />
      </Box>
    )}

    <FlexOverlapFade direction={reverse ? 'ltr' : 'rtl'} />
  </Box>
);

export default WithDefaultContent(FeaturesWithPhotoBlock01);
