import React from 'react'
import { Container, Flex, Box, Card } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'
import Icon from '@solid-ui-components/ContentIcon'
import Buttons from '@solid-ui-theme/buttons/index'
import ContentIcon from '@solid-ui-components/ContentIcon/ContentIcon'

const ServiceColumn = ({ text, collection, icon }) => {
  return  (
    <Box sx={{ width: '100%', px: [3, 4] }}>
      <ContentIcon content={icon} />
      <ContentText content={text} />
      {collection.map(({text}, index) => {
        return (
          <Card sx={{ width: "100%", p: 4, mb: 4, borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <ContentText content={text} />
          </Card>
        )
      })}
      
    </Box>
  )
}

const ContentBlock01 = ({ content, reverse }) => (
  <Container>
    <Flex
      sx={{
        flexDirection: [
          reverse ? `column-reverse` : `column`,
          null,
          null,
          reverse ? `row-reverse` : `row`
        ],
        justifyContent: "center",
        itemsCenter: "center"
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {content.collection.map(({ text, collection, icon }, index) => (
         <Flex sx={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
           
            <ServiceColumn icon={icon} text={text} collection={collection} />

         </Flex>
        ))}
      </Box>
     
    </Flex>
  </Container>
)

export default WithDefaultContent(ContentBlock01)
