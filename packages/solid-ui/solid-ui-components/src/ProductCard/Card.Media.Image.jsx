import React from 'react'
import { GatsbyImage as Img } from 'gatsby-plugin-image'
import { css } from 'theme-ui'
import rv from '@solid-ui-components/utils/buildResponsiveVariant'

const CardMediaImage = ({ variant, moderate, small, loading, images, title }) => {
  return (
    <img
      src={images && images.length > 0 ? images[0].src : ''}
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
