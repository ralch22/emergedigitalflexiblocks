import React from 'react';
import { Box, Container, Flex } from 'theme-ui';
import ContentText from '@solid-ui-components/ContentText';
import ContentButtons from '@solid-ui-components/ContentButtons';
import ContentImages from '@solid-ui-components/ContentImages';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';
import Divider from '@solid-ui-components/Divider/Divider';
import CustomTabSwitcher from '@solid-ui-blocks/Content/Tabs';
import { Link as GLink } from 'gatsby';
import address1 from '../../../../../../site/content/blocks/shared/address1.json';
import address2 from '../../../../../../site/content/blocks/shared/address2.json';
import ClutchWidget from '@solid-ui-components/Widget/Widget';

const styles = {
  wrapper: {
    position: 'relative',
    backgroundImage: 'linear-gradient(280deg, #402C50 0%, #336667 62%)',
    color: 'white',
  },
  footer: {
    flexDirection: ['column', 'row'],
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

function Uae({ content: { text } }) {
  return <ContentText content={text} />;
}

function Usr({ content: { text } }) {
  return <ContentText content={text} />;
}

const tabs = [
  { title: 'UAE', content: <Uae content={address1} /> },
  { title: 'AUS', content: <Usr content={address2} /> },
];

const FooterBlock01 = ({ content: { text, collection, images } }) => {
  console.log('img', collection);
  return (
    <div style={styles.wrapper}>
      <Container sx={{ position: 'relative' }}>
        <Flex sx={styles.footer}>
          <Box sx={styles.column}>
            <Box pb="1" mb="2" mt={[4, 0]}>
              <GLink to="/">
                <ContentImages
                  sx={{ width: `77%` }}
                  content={{ images }}
                  imageEffect="fadeIn"
                />
              </GLink>
            </Box>
            <ContentText content={text} />
            <CustomTabSwitcher tabs={tabs} />
            <img
              style={{ width: 'inherit' }}
              src="https://emergedigital.ae/wp-content/uploads/2019/10/WPEngine_Member-Badge.png"
              alt=""
            />
            <ClutchWidget />
          </Box>

          <Flex
            sx={{
              flexWrap: 'wrap',
              flexBasis: '70%',
              columnGap: [null, '1em'],
            }}
          >
            {collection?.map(
              ({ text, buttons, images }, index) =>
                buttons && (
                  <Box key={`item-${index}`} sx={styles.columnButtons}>
                    <ContentText content={text} variant="h5" />
                    <ContentButtons
                      content={buttons}
                      variant="vertical"
                      wrapperStyles={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    />
                    <Flex>
                      {images &&
                        images.map(({ src, alt }, index) => {
                          return (
                            <img
                              width={50}
                              height={30}
                              src={src.publicURL}
                              alt={alt}
                              key={index}
                            />
                          );
                        })}
                    </Flex>
                  </Box>
                ),
            )}
          </Flex>
        </Flex>

        <Flex
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <p>Copyright © 2023 Emerge Digital. All Rights Reserved. </p>
          <Divider spaceY={2} />
        </Flex>
      </Container>
    </div>
  );
};

FooterBlock01.defaultProps = {
  menuJustify: 'flex-end'
}

export default WithDefaultContent(FooterBlock01)
