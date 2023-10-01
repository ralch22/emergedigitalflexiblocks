import React from 'react'
import { Box } from 'theme-ui'
import rv from '@solid-ui-components/utils/buildResponsiveVariant'
import CardBodyTitle from './Card.Body.Title'
import CardBodyExcerpt from './Card.Body.Excerpt'

const styles = {
  body: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    flex: 1
  }
}

const CardBody = ({ children, omitBody, ...props }) =>
  !omitBody && (
    <Box
      sx={{
        ...styles.body,
        variant: rv(props.variant, 'body')
      }}
    >
      <CardBodyTitle {...props} />
      <CardBodyExcerpt {...props} />
      {children}
    </Box>
  )

export default CardBody
