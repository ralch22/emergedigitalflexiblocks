import React from 'react';
import { Link as GLink } from 'gatsby';
import { Heading } from 'theme-ui';

const CardBodyTitle = ({ variant, title, slug, link, single }) => {
  const linkProps = link
    ? {
        as: 'a',
        href: link,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {
        as: GLink,
        to: `/${slug}`,
      };
  return (
    <Heading
      {...linkProps}
      dangerouslySetInnerHTML={{ __html: title }}
      variant="h4"
    />
  );
};

export default CardBodyTitle;
