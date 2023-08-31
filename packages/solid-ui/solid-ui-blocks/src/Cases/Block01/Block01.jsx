import React from "react";
import { Container, Flex, Box, Badge, Link, Grid, Ima } from 'theme-ui'
import { StaticImage } from "gatsby-plugin-image"
import ContentContainer from '@solid-ui-components/ContentContainer'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import Text from 'theme-ui'
import CustomImages from '@solid-ui-components/CustomImage'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'
import { format } from "date-fns";

import { FaRegClock } from 'react-icons/fa'

const styles = {
  wrapper: {
    flex: [`100%`, null, null, 1],
    minWidth: 400,
    maxWidth: [`none`, null, null, 500],
    cursor: `pointer`,
    p: 3
  },
  card: {
    overflow: `hidden`,
    height: `full`
  },
  content: {
    alignItems: `stretch`,
    flexDirection: [`row`, null, null, `column`],
    height: `full`
  },
  body: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    flex: 1,
    p: 4
  },
  footerWrapper: {
    alignItems: `center`
  },
  caseInfo: {
    flex: 1,
    flexWrap: `wrap`,
    justifyContent: `space-between`,
    color: `omega`,
    ml: 3
  },
  imageWrapper: {
    textAlign: `center`,
    position: `relative`,
    display: `block`,
    height: `full`
  },
  image: {
    display: [`none`, `block`],
    height: `full`,
    bg: `omegaLighter`,
    borderRadius: `default`,
    minHeight: `15rem`,
    width: `100%`,
    div: {
      p: `0 !important`
    }
  },
  avatar: {
    width: `50px`,
    height: `50px`,
    borderRadius: `50%`
  }
}

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
  const limitedExcerpt = excerpt.length > maxLength ? `${excerpt.slice(0, maxLength)}...` : excerpt;

  return limitedExcerpt;
}

async function getFeaturedMediaUrl(featuredMediaId) {
  
  const response = await fetch(`https://emergedigital.ae/wp-json/wp/v2/media/${featuredMediaId}`);
  const featuredMediaData = await response.json();
  return featuredMediaData.source_url;
 
}

const Cases = ({ cases }) => {
  
  return (
    <Grid columns={[1, 2]} gap={4} style={{  }}>
      {cases && cases.map(
         ({ id, content, title, featured_media }, index) => {
          const trimedText = createExcerpt(content.rendered)
          const image = getFeaturedMediaUrl(featured_media)
          
          return (
            <Link sx={{ color: `black`, TextDecoration: `none` }} href={`/cases/${slug}`}>
              <Box
                key={id}
                p={4}
                bg="white"
                boxShadow="md"
                borderRadius="md"
                styles={styles.wrapper}
                sx={{ transition: "transform 0.2s", "&:hover": { transform: "scale(1.02)" } }}
              >
                <Box sx={{ flex: [0, 1], m: 2, mb: [null, null, null, 0] }}>
                  <Box sx={styles.imageWrapper}>                          
                  <img
                    src={image.value}
                    style={styles.image}
                  />
                    </Box>
              
                  <Box sx={styles.body}>
                    
                    <h2 style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: title.rendered }} />
                    <div dangerouslySetInnerHTML={{ __html: trimedText }} /> 
                </Box>
              </Box>
              </Box>
            </Link>
          )
        }
      )}
    </Grid>
  );
};

export default Cases;

