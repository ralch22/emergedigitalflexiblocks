import React from 'react'
import { Link as GLink } from 'gatsby'
import { Link, useThemeUI, get } from 'theme-ui'
import AvatarSimple from '@solid-ui-components/AvatarSimple'
import rv from '@solid-ui-components/utils/buildResponsiveVariant'

const CardFooterAuthorAvatar = ({ variant, omitAuthor, author: { node } }) => {
  const context = useThemeUI()

  if (omitAuthor) return null

  const responsiveVariant = rv(variant, 'authorPhoto')

  const visibility = responsiveVariant.reduce(
    (mobileVisibility, variant) =>
      mobileVisibility === false &&
      get(context.theme, variant, {}).display === 'none'
        ? false
        : true,
    false
  )

  return (
    node && node.url ? (
      <Link
        as={GLink}
        to={node.slug}
        aria-label={node.name}
        sx={{ variant: responsiveVariant }}
      >
        <AvatarSimple
          avatar={node.url}
          alt={node.name}
          size='small'
        />
      </Link>
    ) : null
  )
}
export default CardFooterAuthorAvatar
