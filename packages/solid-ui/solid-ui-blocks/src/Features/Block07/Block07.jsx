import React from 'react';
import { Box, Container, Flex } from 'theme-ui';
import Reveal from '@solid-ui-components/Reveal';
import Divider from '@solid-ui-components/Divider';
import ContentForm from '@solid-ui-components/ContentForm';
import ListItem from '@solid-ui-components/ListItem';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';

const FeaturesBlock06 = ({ content: { collection, form, reverse } }) => (
  <Container>
    <Box
      sx={{
        backgroundImage: 'linear-gradient(280deg, #402C50 0%, #336667 62%)',
        padding: ['40px 20px', '40px 40px', '60px 60px'],
        width: '100%',
        borderRadius: '2rem',
      }}
    >
      <Reveal sx={{ width: '100%' }} effect="fadeInUp">
        {collection && (
          <>
            <Divider />
            <Flex
              sx={{
                alignItems: 'center',
                flexDirection: ['column', reverse ? 'row-reverse' : 'row'],
                mx: [-2, -4],
              }}
            >
              {collection?.map((props, index) => (
                <Box
                  key={`item-${index}`}
                  sx={{
                    flexBasis: ['100%', '100%', '60%'],
                    mb: [4, 4, 0],
                    mr: [0, 0, 5],
                  }}
                >
                  <Reveal effect="fadeInGrow" delay={0.15 * (index + 1)}>
                    <ListItem {...props} iconProps={{ size: 'md' }} right />
                  </Reveal>
                </Box>
              ))}
              <Box
                sx={{
                  flexBasis: ['100%', '100%', '40%'],
                  mt: [4, 4, 0],
                  ml: [0, 0, '1em'],
                }}
              >
                {form && (
                  <ContentForm
                    form={form}
                    id={`form.${form.fields.identifier}`}
                  />
                )}
              </Box>
            </Flex>
          </>
        )}
      </Reveal>
    </Box>
  </Container>
);

export default WithDefaultContent(FeaturesBlock06)
