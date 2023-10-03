import React from 'react';
import { get, Text, useThemeUI } from 'theme-ui';
import rv from '@solid-ui-components/utils/buildResponsiveVariant';

const styles = {
  excerpt: {
    flex: `auto`,
    mb: 3,
  },
};

function extractFirstParagraph(htmlString) {
  // Create a temporary div element
  const tempDiv = document.createElement('div');

  // Set the HTML content of the div
  tempDiv.innerHTML = htmlString;

  // Find the first <p> element
  const firstParagraph = tempDiv.querySelector('p');

  if (firstParagraph) {
    // If a <p> element is found, return its innerHTML
    return generateExcerpt(firstParagraph.innerHTML, 200);
  } else {
    // If no <p> element is found, return null or an appropriate message
    return null;
  }
}

export function generateExcerpt(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  const words = text.split(' ');
  let excerpt = '';
  let currentLength = 0;

  for (const word of words) {
    if (currentLength + word.length + 1 <= maxLength) {
      excerpt += word + ' ';
      currentLength += word.length + 1;
    } else {
      break;
    }
  }

  // Trim any extra whitespace and add an ellipsis (...) to indicate the excerpt has been truncated
  excerpt = excerpt.trim() + '...';

  return excerpt;
}

// Example usage:

const CardBodyExcerpt = ({ variant, content, omitExcerpt }) => {
  const context = useThemeUI();

  const responsiveVariant = rv(variant, 'excerpt');

  const visibility = responsiveVariant.reduce(
    (mobileVisibility, variant) =>
      mobileVisibility === false &&
      get(context.theme, variant, {}).display === 'none'
        ? false
        : true,
    false,
  );
  const firstParagraphContent = extractFirstParagraph(content.rendered);

  return !omitExcerpt && visibility ? (
    <Text
      variant="small"
      sx={{
        ...styles.excerpt,
        variant: responsiveVariant,
      }}
      dangerouslySetInnerHTML={{ __html: firstParagraphContent }}
    />
  ) : null;
};

export default CardBodyExcerpt;
