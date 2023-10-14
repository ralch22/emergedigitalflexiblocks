import React, { useEffect } from 'react';
import { Box, Container, Flex } from 'theme-ui';
import Divider from '@solid-ui-components/Divider';
import FlexImage from '@solid-ui-components/FlexImage';
import FlexContent from '@solid-ui-components/FlexContent';
import ContentButtons from '@solid-ui-components/ContentButtons';
import ContentText from '@solid-ui-components/ContentText';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';
import CaseList from '@solid-ui-components/CaseList/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCaseStudies } from '@elegantstack/gatsby-theme-flexiblocks/src/store/ducks/caseSlice';

const FeaturesBlock06 = ({ content: { text, buttons, reverse } }) => {
  const dispatch = useDispatch();
  const { caseStudies, status, error } = useSelector(state => state.case);

  useEffect(() => {
    dispatch(fetchCaseStudies());
  }, [dispatch]);

  return (
    <Container>
      <Box
        sx={{
          backgroundImage: 'linear-gradient(280deg, #402C50 0%, #336667 62%)',
          padding: ['40px 20px', '40px 40px', '60px 60px'],
          width: '100%',
          borderRadius: '2rem',
        }}
      >
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
          <FlexContent reverse={reverse}>
            <Box sx={{ textAlign: ['center', 'left'] }}>
              <ContentText content={text} />
            </Box>
            {buttons && (
              <Box sx={{ textAlign: [`center`, `left`] }}>
                <Divider space={3} />
                <ContentButtons content={buttons} />
              </Box>
            )}
          </FlexContent>
          <Divider space="5" />
          <FlexImage reverse={reverse}>
            {caseStudies && (
              <CaseList
                nodes={caseStudies}
                limit={1}
                columns={[1, 1, 1, 3]}
                variant={[
                  'horizontal-md',
                  'horizontal',
                  'horizontal',
                  'vertical',
                ]}
              />
            )}
          </FlexImage>
        </Flex>
      </Box>
    </Container>
  );
};
export default WithDefaultContent(FeaturesBlock06)
