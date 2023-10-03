import React from 'react';
import { Container, Flex, Box, css } from 'theme-ui';
import Reveal from '@solid-ui-components/Reveal';
import Divider from '@solid-ui-components/Divider';
import ContentText from '@solid-ui-components/ContentText';
import ContentButtons from '@solid-ui-components/ContentButtons';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';
import Icon from '@solid-ui-components/ContentIcon';
import Buttons from '@solid-ui-theme/buttons/index';

const ServiceColumn = ({ title, collection }) => {
  const chunkSize = Math.ceil(collection.length / 3);
  const chunks = Array.from({ length: 3 }, (_, i) =>
    collection.slice(i * chunkSize, (i + 1) * chunkSize),
  );
  return (
    <Box sx={{ width: ['100%', '33%'], px: [3, 4] }}>
      <Box>
        <ContentText content={title} variant="h4" />
      </Box>

      {chunks.map((chunk, index) => {
        return (
          <>
            {chunk.map(({ icon, text }, index) => {
              return (
                <Flex sx={{ alignItems: 'center', mb: 2 }} key={index}>
                  <Icon content={icon} bg="#000" mr="3" p="2" round />
                  <ContentText content={text} mb="0" />
                </Flex>
              );
            })}
          </>
        );
      })}
    </Box>
  );
};

const ServiceGroup = ({ text, collection }) => (
  <Box sx={{ mb: 5 }}>
    <Box sx={{ textAlign: ['center', 'left'] }}>
      <ContentText content={text} ml="0" />
    </Box>
    <Flex sx={{ flexWrap: 'wrap' }}>
      {collection.map(({ text, collection, ...rest }, index) => (
        <ServiceColumn
          title={text}
          collection={collection}
          key={index}
          {...rest}
        />
      ))}
    </Flex>
  </Box>
);

const ContentBlock01 = ({ content, reverse }) => (
  <Container>
    <Flex
      sx={{
        flexDirection: [
          reverse ? `column-reverse` : `column`,
          null,
          null,
          reverse ? `row-reverse` : `row`,
        ],
        justifyContent: 'center',
        itemsCenter: 'center',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {content.collection.map(({ text, collection, buttons }, index) => (
          <Box>
            <Reveal effect="fadeInLeft" key={index}>
              <ServiceGroup text={text} collection={collection} />
            </Reveal>
          </Box>
        ))}
      </Box>
    </Flex>
  </Container>
);

export default WithDefaultContent(ContentBlock01);
