import React from 'react';
import { GatsbyImage as Img } from 'gatsby-plugin-image';
import { css } from 'theme-ui';
import rv from '@solid-ui-components/utils/buildResponsiveVariant';

const CardMediaImage = ({
  variant,
  moderate,
  small,
  loading,
  featuredImage: {
    node: { sourceUrl },
  },
  title,
}) => (
  <img
    src={sourceUrl}
    loading={loading}
    alt={title}
    css={css({
      height: `full`,
      width: `100%`,
      verticalAlign: `middle`, //avoid baseline gap
      img: {
        bg: `omegaLighter`,
      },
      variant: rv(variant, 'image'),
    })}
  />
);
CardMediaImage.defaultProps = {
  loading: 'lazy',
};

export default CardMediaImage;
