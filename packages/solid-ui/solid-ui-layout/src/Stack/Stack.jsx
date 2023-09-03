import React, { useContext } from 'react'
import { Container, Flex } from 'theme-ui'
import pageContextProvider from '@helpers/pageContextProvider'
import Section from '@solid-ui-components/Section'
import Reveal from '@solid-ui-components/Reveal'

export default function Stack ({ children, direction, effectProps = {}, ...props }) {
  const context = useContext(pageContextProvider)

  const content = (
    <Container>
      <Section {...props}>
        <Flex sx={{ flexDirection: direction }}>{children}</Flex>
      </Section>
    </Container>
  )

  //Use Reveal animation only on route update
  return context.location &&
    context.location.action === 'PUSH' &&
    effectProps.effect !== false ? (
    <Reveal {...effectProps}>{content}</Reveal>
  ) : (
    content
  )
}
