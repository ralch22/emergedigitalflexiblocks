import React from 'react'
import { Container, Flex, Box, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const ContentBlock02 = ({ content: { text } }) => (
  <Container variant="wide" sx={{ background: "#rrr" }}>
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <ContentText content={text} />
    </Flex>
  </Container>
)

export default WithDefaultContent(ContentBlock02)

