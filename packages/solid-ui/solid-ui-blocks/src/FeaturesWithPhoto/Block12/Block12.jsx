import React, { Fragment } from 'react'
import { Container, Flex, Box } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ListItem from '@solid-ui-components/ListItem'
import FlexImage from '@solid-ui-components/FlexImage'
import FlexContent from '@solid-ui-components/FlexContent'
import FlexOverlapFade from '@solid-ui-components/FlexOverlapFade'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentButtons from '@solid-ui-components/ContentButtons'
import ContentText from '@solid-ui-components/ContentText'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const FeaturesWithPhotoBlock01 = ({ content: { text, images, simpleImg, collection, buttons, gradient }, reverse, dangerously}) => (
  <Box sx={{ background: gradient ? "linear-gradient(90deg, #336567 0%, #3F2B56 100%)" : '', width: '100%' }}>
    <Container wide sx={{ position: `relative` }}>
      <Flex
          sx={{
            alignItems: [null, `center`],
            flexDirection: [
              reverse ? `column-reverse` : `column`,
              reverse ? `row-reverse` : `row`
            ],
            mx: [null, null, null, -4]
          }}
        >
          <FlexContent reverse={reverse}>
            {dangerously ? (
              <Box sx={{ textAlign: ['center', 'left'] }}>
                <ContentText content={text?.[0]} />
                <ContentText dangerously content={text?.[1]} />
              </Box>
            ) : (
              <Box sx={{ textAlign: ['center', 'left'] }}>
                <ContentText content={text} />
              </Box>
            )}
            
            {buttons && (
              <Box sx={{ textAlign: [`center`, `left`] }}>
                <Divider space={3} />
                <ContentButtons content={buttons} />
              </Box>
            )}
          </FlexContent>
          <FlexImage reverse={reverse}>
            <img style={{ width: '100%' }} src="https://emergedigital.ae/wp-content/uploads/2022/07/GMP_Logo_Animation_Loop_kqdSyht.gif" alt={images[0].alt} />
          </FlexImage>
        </Flex>
      
      <FlexOverlapFade direction={reverse ? 'ltr' : 'rtl'} />
    </Container>
  </Box>
)

export default WithDefaultContent(FeaturesWithPhotoBlock01)
