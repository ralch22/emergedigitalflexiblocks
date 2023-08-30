import React from 'react'
import { Container, Grid, Box, Card } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'
import Icon from '@solid-ui-components/ContentIcon'
import Buttons from '@solid-ui-theme/buttons/index'
import ContentIcon from '@solid-ui-components/ContentIcon/ContentIcon'

const ServiceColumn = ({ text }) => {
  return  (
    <Box sx={{ width: '100%', px: [2, 3] }}>
    
      
        <Card sx={{ width: "100%", p: 4, mb: 4, borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <ContentText flex content={text} />
        </Card>
    
    </Box>
  )
}

const ContentBlock01 = ({ content: { text, collection, buttons } }) => {
  console.log("collection", collection)
  return (
    <Container>
        <Box sx={{ width: '100%', textAlign: "center", display: 'flex', justifyContent: `center`, alignItems: 'center', flexDirection: 'column' }}>
        <ContentText sx={{ textAligin: 'center' }} center content={text} />
        </Box>
        <Divider />
        <Grid columns={[1, 2]} gap={2}>
        {collection && collection.map(({text}, index) => {
        console.log("chunk", collection)
        return (
            <ServiceColumn text={text} />
        )
      })}
        
       
      </Grid>
      
    </Container>
  )
}

export default WithDefaultContent(ContentBlock01)
