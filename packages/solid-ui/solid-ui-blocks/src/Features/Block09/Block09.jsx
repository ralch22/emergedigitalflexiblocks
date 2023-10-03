import React, { useEffect, useState } from 'react';
import { Container, Flex, Box } from 'theme-ui';
import Reveal from '@solid-ui-components/Reveal';
import Divider from '@solid-ui-components/Divider';
import FlexImage from '@solid-ui-components/FlexImage';
import FlexContent from '@solid-ui-components/FlexContent';
import FlexOverlapFade from '@solid-ui-components/FlexOverlapFade';
import ContentButtons from '@solid-ui-components/ContentButtons';
import ContentCard from '@solid-ui-components/ContentCard';
import ContentText from '@solid-ui-components/ContentText';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';

const FeaturesBlock06 = ({ content: { text, buttons, reverse } }) => {
  const [post, setPost] = useState(null);
  const [postImage, setPostImage] = useState(null);
  useEffect(() => {
    fetchSingleCaseStudy('double-revenue-for-ecommerce-vision-eyecare-brand');
  }, []);
  const fetchSingleCaseStudy = async slug => {
    try {
      const response = await fetch(
        `https://emergedigital.ae/wp-json/wp/v2/case-studies?slug=${slug}`,
      );
      const caseStudies = await response.json();

      // Assuming there's only one case study with the provided slug

      setPost(caseStudies[0]);

      // fetchCaseImage(caseStudies[0].featured_media)
    } catch (error) {
      console.error('Error fetching case study:', error);
      return null;
    }
  };

  const fetchCaseImage = async id => {
    try {
      const response = await fetch(
        `https://emergedigital.ae/wp-json/wp/v2/media/${id}`,
      );
      const caseImage = await response.json();

      // Assuming there's only one case study with the provided slug

      setPostImage(caseImage);
    } catch (error) {
      console.error('Error fetching case study:', error);
      return null;
    }
  };

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
          <FlexImage reverse={reverse}>
            {post && <ContentCard post={post} />}
          </FlexImage>
        </Flex>

        <FlexOverlapFade direction={reverse ? 'ltr' : 'rtl'} />
      </Box>
    </Container>
  );
};
export default WithDefaultContent(FeaturesBlock06);
