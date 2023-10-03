import React from 'react';
import { Link as GLink } from 'gatsby';
import { Heading } from 'theme-ui';
import rv from '@solid-ui-components/utils/buildResponsiveVariant';
import { generateExcerpt } from './Card.Body.Excerpt';

const CardBodyTitle = ({ variant, title, slug, link }) => {
  const linkProps = {
    as: GLink,
    to: `/cases/${slug}`,
  };

  const titleWithExcerpt = generateExcerpt(title.rendered, 100);
  return (
    <>
      <Heading
        {...linkProps}
        dangerouslySetInnerHTML={{ __html: titleWithExcerpt }}
        sx={{ variant: rv(variant, 'title') }}
      />
    </>
  );
};

export default CardBodyTitle;
