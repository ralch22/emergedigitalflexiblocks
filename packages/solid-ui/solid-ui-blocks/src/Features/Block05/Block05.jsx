import React from 'react';
import { Box, Container, css, Flex, Grid } from 'theme-ui';
import Divider from '@solid-ui-components/Divider';
import Reveal from '@solid-ui-components/Reveal';
import ListItem from '@solid-ui-components/ListItem';
import ContentContainer from '@solid-ui-components/ContentContainer';
import ContentText from '@solid-ui-components/ContentText';
import Icon from '@solid-ui-components/ContentIcon';
import ContentButtons from '@solid-ui-components/ContentButtons';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';
import ContentImages from '@solid-ui-components/ContentImages';

const styles = {
  listItem: {
    flex: `1 1 0`,
    minWidth: 300,
    p: 3,
  },
  itemDescription: {
    flexBasis: `3/5`,
    flexGrow: 1,
    order: [1, null, 0],
    mb: 3,
  },
};

const FeaturesBlock05 = ({ content: { text, collection, buttons }, col2 }) => (
  <Container as={Reveal}>
    <Box sx={{ textAlign: `center` }}>
      <ContentText content={text} />
    </Box>
    {collection && (
      <>
        <Divider />
        <Grid columns={col2 ? [1, 2, 2, 2] : [1, 2, 2, 3]} gap={3}>
          {collection.map(
            ({ text, images, icon, collection, buttons, container }, index) => (
              <Reveal
                key={`item-${index}`}
                effect="fadeInGrow"
                delay={0.15 * (index + 1)}
                css={css(styles.listItem)}
              >
                <ContentContainer
                  content={container}
                  variant="cards.paper"
                  sx={{
                    height: `full`,
                    display: images ? 'flex' : '',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {images && (
                    <ContentImages sx={{ width: 100 }} content={{ images }} />
                  )}
                  <Box>
                    <Icon content={icon} size="md" mr="3" mb="3" />
                    <ContentText content={text?.[0]} />
                    <Flex sx={{ alignItems: `center`, flexWrap: `wrap` }}>
                      <ContentText
                        content={text?.slice(1)}
                        sx={styles.itemDescription}
                        mt={[3, null, 0]}
                      />
                      {collection && (
                        <Box sx={{ flexGrow: 1, mr: [3, null, 0] }}>
                          {collection.map((props, index) => (
                            <ListItem
                              key={`item-${index}`}
                              {...props}
                              compact
                            />
                          ))}
                        </Box>
                      )}
                    </Flex>
                    {buttons && (
                      <>
                        <Divider space={3} />
                        <ContentButtons content={buttons} />
                      </>
                    )}
                  </Box>
                </ContentContainer>
              </Reveal>
            ),
          )}
        </Grid>
      </>
    )}
    <Flex
      sx={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {buttons && (
        <>
          <Divider space={3} />
          <ContentButtons content={buttons} />
        </>
      )}
    </Flex>
  </Container>
);

export default WithDefaultContent(FeaturesBlock05)
