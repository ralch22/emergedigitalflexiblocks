import React from 'react';
import { Link as GLink } from 'gatsby';
import { get, Image, Link, useThemeUI } from 'theme-ui';
import rv from '@solid-ui-components/utils/buildResponsiveVariant';

const CardFooterAuthorAvatar = ({ variant, omitAuthor, author: { node } }) => {
  const context = useThemeUI();

  if (omitAuthor) return null;

  const responsiveVariant = rv(variant, 'authorPhoto');

  const visibility = responsiveVariant.reduce(
    (mobileVisibility, variant) =>
      mobileVisibility === false &&
      get(context.theme, variant, {}).display === 'none'
        ? false
        : true,
    false,
  );

  return node && node.avatar.url ? (
    <Link as={GLink} to={`/author/${node.slug}`} aria-label={node.name}>
      <Image
        src={node.avatar.url}
        alt={node.name}
        sx={{
          width: 40,
          height: 40,
          borderRadius: `50%`,
          mr: 3,
        }}
      />
    </Link>
  ) : null;
};
export default CardFooterAuthorAvatar;
