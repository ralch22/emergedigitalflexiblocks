import React from 'react'
import { Container, Flex, Box, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const ContentBlock08 = ({ content: { text } }) => (
 
  <Reveal effect='fadeInLeft'>
    <Box
      sx={{
        flexBasis: [null, null, null, `2/5`],
        position: `relative`,
        textAlign: "center"
      }}
    >
      <ContentText content={text} />
    </Box>
  </Reveal>
)

export default WithDefaultContent(ContentBlock08)
