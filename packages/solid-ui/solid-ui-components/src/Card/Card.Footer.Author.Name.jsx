import React from 'react'
import { Link as GLink } from 'gatsby'
import { Text, Link } from 'theme-ui'
import rv from '@solid-ui-components/utils/buildResponsiveVariant'

const styles = {
  author: {
    pr: 2
  }
}

const CardFooterAuthorName = ({ variant, omitAuthor, author: { node } }) => (
    <Text sx={{ ...styles.author, variant: rv(variant, 'author') }}>
      <Link variant='mute' as={GLink} to={node.slug}>
        <strong>{node.name}</strong>
      </Link>
    </Text>
  )
export default CardFooterAuthorName
