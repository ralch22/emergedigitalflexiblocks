import React from 'react'
import { Container, Flex, Box } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentContainer from '@solid-ui-components/ContentContainer'
import ContentText from '@solid-ui-components/ContentText'
import ListItem from '@solid-ui-components/ListItem'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'
import VideoPlayer from '@solid-ui-components/Video/Video'

const FeaturesBlock06 = ({ content: { text = [], collection, buttons } }) => (
  <Container sx={{ textAlign: `center` }}>
    <Box>
      <ContentText content={text} />
    </Box>
    <VideoPlayer>
    <iframe width="864" height="486" src="https://www.youtube.com/embed/dSufVTSCeVw" title="Builder Studio" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </VideoPlayer>
  </Container>
)

export default WithDefaultContent(FeaturesBlock06)
