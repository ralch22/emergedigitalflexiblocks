import React from 'react';
import { Box, Container, Flex } from 'theme-ui';
import Reveal from '@solid-ui-components/Reveal';
import Divider from '@solid-ui-components/Divider';
import FlexImage from '@solid-ui-components/FlexImage';
import FlexContent from '@solid-ui-components/FlexContent';
import ContentText from '@solid-ui-components/ContentText';
import ContentImages from '@solid-ui-components/ContentImages';
import ContentButtons from '@solid-ui-components/ContentButtons';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';
import ListItem from '@solid-ui-components/ListItem';

const styles = {
  items: {
    flexWrap: `wrap`,
    mx: [-2, -4],
    '& > div': {
      flex: 1,
      px: [2, 4],
      textAlign: [`center`, `unset`],
    },
  },
};

const textArray = [
  {
    text: 'Analytics 360 is a complete enterprise analytics solution that gives you a deeper understanding of your customers so you can deliver better experiences and improve your marketing results.​',
    variant: 'medium',
  },
];

const FeaturesWithPhotoBlock05 = ({
  content: { text, images, collection, buttons },
  reverse,
  mid,
  bottomText,
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
      <FlexImage reverse={reverse}>
        <Box sx={{ textAlign: [`center`, `left`] }}>
          <ContentText content={text} />
        </Box>
        <ContentImages
          sx={{ width: mid ? 300 : '' }}
          content={{ images }}
          reverse={reverse}
        />

        {bottomText && <ContentText content={textArray} />}
      </FlexImage>
      <FlexContent reverse={reverse}>
        {collection && (
          <>
            <Divider space={3} />

            {collection.map((props, index) => (
              <Reveal
                key={`item-${index}`}
                effect="fadeInPop"
                delay={0.3 * (index + 1)}
              >
                <Box sx={{ mt: 5 }}>
                  <ListItem {...props} iconProps={{ size: 'md' }} compact />
                </Box>
                {/* <Flex sx={{ alignItems: `center`, mb: 3 }}>
                  <ContentIcon  content={icon} size='sm' mr='3' />
                  <ContentText content={text[0]} mb='0' />
                </Flex> */}
              </Reveal>
            ))}
          </>
        )}
        {buttons && (
          <>
            <Divider space={3} />
            <ContentButtons content={buttons} />
          </>
        )}
      </FlexContent>
    </Flex>
  </Container>
);

export default WithDefaultContent(FeaturesWithPhotoBlock05)
