import React from 'react'
import { css } from 'theme-ui'
import rv from '@solid-ui-components/utils/buildResponsiveVariant'

const CardMediaImage = ({
  variant,
  moderate,
  small,
  loading,
  imageUrl,
  title
}) => {
  return (
    <img
      src={imageUrl}
      loading={loading}
      alt={title}
      css={css({
        height: `full`,
        width: `100%`,
        verticalAlign: `middle`, //avoid baseline gap
        img: {
          bg: `omegaLighter`
        },
        variant: rv(variant, 'image')
      })}
    />
  )
}
CardMediaImage.defaultProps = {
  loading: 'lazy'
}

export default CardMediaImage
