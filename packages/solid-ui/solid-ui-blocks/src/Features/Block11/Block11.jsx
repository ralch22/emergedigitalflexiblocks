import React from 'react';
import { Box, Container } from 'theme-ui';
import ContentText from '@solid-ui-components/ContentText';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';
import VideoPlayer from '@solid-ui-components/Video/Video';

const FeaturesBlock06 = ({ content: { text = [], collection, buttons } }) => (
  <Container sx={{ textAlign: `center` }}>
    <Box>
      <ContentText content={text} />
    </Box>
    <VideoPlayer>
      <iframe
        width="864"
        height="486"
        src="https://www.youtube.com/embed/dSufVTSCeVw"
        title="Builder Studio"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </VideoPlayer>
  </Container>
);

export default WithDefaultContent(FeaturesBlock06);
