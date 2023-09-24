import React from 'react'
import { Link as GLink } from 'gatsby'
import { Heading } from 'theme-ui'
import rv from '@solid-ui-components/utils/buildResponsiveVariant'

const CardBodyTitle = ({ variant, name, price_html, slug, link }) => {
  const linkProps = link
    ? {
        as: 'a',
        href: link,
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    : {
        as: GLink,
        to: slug
      }
  return (
    <>
      <Heading {...linkProps} dangerouslySetInnerHTML={{ __html: name }} sx={{ variant: rv(variant, 'title') }} />
    <Heading {...linkProps} dangerouslySetInnerHTML={{ __html: price_html }} variant="h4" sx={{ variant: rv(variant, 'h4') }} />
    </>
  )
}

export default CardBodyTitle
