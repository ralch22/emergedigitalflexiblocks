import React, { useState } from 'react';
import { Container, Box, Flex, Link } from 'theme-ui';
import ContentText from '@solid-ui-components/ContentText';
import ContentButtons from '@solid-ui-components/ContentButtons';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';
import Divider from '@solid-ui-components/Divider/Divider';
import ContentImages from '@solid-ui-components/ContentImages/ContentImages';

const styles = {
  wrapper: {
    position: 'relative',
    backgroundImage: "linear-gradient(280deg, #402C50 0%, #336667 62%)",
    color: 'white',
  },
  footer: {
    flexDirection: ['column-reverse', 'row'],
    width: '100%',
    py: 5,
  },
  column: {
    flexBasis: '30%',
    minWidth: 200,
    p: 4,
  },
  columnButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    p: 3,
  },
};

const FooterBlock01 = ({ content: { text, collection } }) => {

  return (
    <div style={styles.wrapper}>
      <Container px="5" sx={{ position: 'relative' }}>
        <Flex sx={styles.footer}>
          <Box sx={styles.column}>
            <ContentText content={text} />
          </Box>
          <Divider spaceX="50px" />
          <Flex sx={{ flexWrap: 'wrap', flexBasis: '70%' }}>
            {collection?.map(
              ({ text, buttons, images }, index) =>
              buttons && (
                <Box key={`item-${index}`} sx={styles.columnButtons}>
               
                  <Flex>
                  {images && images.map((img, index) => (
                     <ContentImages
                     content={img}
                     
                   />
                  ))}
                  </Flex>
                   
                  <ContentText content={text} variant="h5" />
                  <ContentButtons
                    content={buttons}
                    variant="vertical"
                    wrapperStyles={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  />
                </Box>
              ))}
          </Flex>
        </Flex>
      </Container>
    </div>
  );
};

FooterBlock01.defaultProps = {
  menuJustify: 'flex-end',
};

export default WithDefaultContent(FooterBlock01);
