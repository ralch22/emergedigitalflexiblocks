import React from 'react'
import { Link as GLink } from 'gatsby'
import { Heading } from 'theme-ui'
import rv from '@solid-ui-components/utils/buildResponsiveVariant'

const CardBodyTitle = ({ variant, title, slug, link }) => {
  const linkProps = link
    ? {
        as: 'a',
        href: link,
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    : {
        as: GLink,
        to: `posts/${slug}`
      }
  return (
    <Heading {...linkProps} dangerouslySetInnerHTML={{ __html: title }} sx={{ variant: rv(variant, 'title') }} />
  )
}

export default CardBodyTitle
