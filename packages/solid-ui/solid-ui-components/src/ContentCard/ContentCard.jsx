import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Container, Flex, Box, css, Grid } from 'theme-ui';
import Divider from '@solid-ui-components/Divider';
import Reveal from '@solid-ui-components/Reveal';
import ListItem from '@solid-ui-components/ListItem';
import ContentContainer from '@solid-ui-components/ContentContainer';
import ContentText from '@solid-ui-components/ContentText';
import Icon from '@solid-ui-components/ContentIcon';

const GoogleMap = ({ post: { title, content } }) => {
  function createExcerpt(content) {
    // Find all <p> tags in the content
    const paragraphs = content.match(/<p>.*?<\/p>/g);

    if (!paragraphs) {
      return ''; // Return an empty excerpt if no <p> tags are found
    }

    // Find the first <p> tag with at least 30 words
    const firstParagraph = paragraphs.find(paragraph => {
      const text = paragraph.replace(/<\/?p>/g, ''); // Remove <p> tags
      const words = text.split(/\s+/).filter(word => word !== ''); // Split into words

      return words.length >= 10;
    });

    if (!firstParagraph) {
      return ''; // Return an empty excerpt if no suitable <p> tag is found
    }

    // Remove HTML tags and trim whitespace
    const excerpt = firstParagraph.replace(/<[^>]+>/g, '').trim();

    // Limit the excerpt length if needed
    const maxLength = 200;
    const limitedExcerpt =
      excerpt.length > maxLength
        ? `${excerpt.slice(0, maxLength)}...`
        : excerpt;

    return limitedExcerpt;
  }
  const excerpt = createExcerpt(content.rendered);

  const styles = {
    h2: {
      boxSizing: 'border-box',
      margin: 0,
      minWidth: 0,
      marginBottom: '2em',
      fontFamily: "'Poppins',sans-serif",
      fontWeight: 'bold',
      lineHeight: 1.55,
      display: 'block',
      fontSize: '2.25rem',
      maxWidth: '650px',
      color: '#fff',
    },
    h4: {
      boxSizing: 'border-box',
      margin: 0,
      minWidth: 0,
      marginBottom: '1em',
      fontFamily: "'Poppins',sans-serif",
      fontWeight: 'bold',
      lineHeight: 1.55,
      display: 'block',
      fontSize: '1.5rem',
      maxWidth: '650px',
      color: '#fff',
    },
  };
  return (
    <Reveal effect="fadeInGrow" delay={0.15}>
      <h4 style={styles.h4}>Curious to learn more?</h4>
      <h2 style={styles.h2}>See Our Case Studies</h2>
      <ContentContainer variant="cards.paper" sx={{ height: `full` }}>
        <Flex sx={{ alignItems: `center`, flexWrap: `wrap` }}>
          <h4>{title.rendered}</h4>
          <p>{excerpt}</p>
        </Flex>
      </ContentContainer>
    </Reveal>
  );
};

GoogleMap.defaultProps = {
  lat: 59.95,
  lng: 30.33,
  zoom: 12,
};

export default GoogleMap;
