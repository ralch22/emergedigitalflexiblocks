/**
 * Placeholder component to shadow
 */

import React, { useEffect, useState } from 'react';
import { Box, Card } from 'theme-ui';
import Layout from '@solid-ui-layout/Layout';
import Stack from '@solid-ui-layout/Stack/Stack';
import Main from '@solid-ui-layout/Main/Main';
import Footer from '@solid-ui-blocks/Footer/Block01';
import Header from '@solid-ui-blocks/Header/Block01';
import Divider from '@solid-ui-components/Divider';
import {
  PostBody,
  PostComments,
  PostHead,
  PostImage,
  PostTagsShare,
} from '@solid-ui-blocks/Case';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import { ArticleJsonLd } from 'gatsby-plugin-next-seo';

export default function Case({
  pageContext,
  data: { allBlockContent },
  ...props
}) {
  const {
    post: { slug },
    siteUrl,
  } = pageContext;
  const [caseStudy, setCaseStudy] = useState(null);
  useEffect(() => {
    async function fetchCaseStudy() {
      try {
        // Fetch the single case study by slug
        const response = await fetch(
          `https://emergedigital.ae/wp-json/wp/v2/case-studies?slug=${slug}`,
        );
        const caseStudy = await response.json();

        if (caseStudy.length === 0) {
          // Case study not found, handle accordingly
          console.error('Case study not found:', slug);
          return;
        }

        const featuredMediaId = caseStudy[0]?.featured_media;

        if (featuredMediaId) {
          // Fetch media data for the featured media ID
          const mediaResponse = await fetch(
            `https://emergedigital.ae/wp-json/wp/v2/media/${featuredMediaId}`,
          );

          if (mediaResponse.status === 200) {
            const mediaData = await mediaResponse.json();
            // Update the case study with the image URL
            caseStudy[0].imageUrl = mediaData.guid.rendered;
          } else {
            // Handle unauthorized or other error responses here if needed
            console.error('Error fetching media:', mediaResponse.statusText);
          }
        } else {
          // Case study has no featured media, set a default image URL
          caseStudy[0].imageUrl = 'https://picsum.photos/400/300'; // Replace with a placeholder URL
        }

        setCaseStudy(caseStudy[0]);
      } catch (error) {
        console.error('Error fetching case study:', error);
        // Handle any other errors that occur during case study fetching
      }
    }

    fetchCaseStudy();
  }, [slug]);
  console.log('case: ', caseStudy);
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  return (
    <Layout {...props}>
      {caseStudy && (
        <>
          <head dangerouslySetInnerHTML={{ __html: caseStudy.yoast_head }} />
          <ArticleJsonLd
            url={caseStudy.link}
            headline={caseStudy.title.rendered}
            images={[caseStudy.imageUrl]}
            datePublished={caseStudy.date}
            dateModified={caseStudy.modified}
            description={caseStudy.content.rendered}
            overrides={{
              '@type': 'BlogPosting', // set's this as a blog post.
            }}
          />
          <Header search content={content['header']} />

          <div style={{ marginTop: `5rem` }}>
            <Stack effectProps={{ effect: 'fadeInDown' }}>
              <PostHead {...caseStudy} />
            </Stack>
          </div>
          <Divider />
          <Stack effectProps={{ effect: 'fadeInUp' }}>
            <Main>
              <Card variant="paper">
                <PostImage {...caseStudy} inCard />
                <PostBody {...caseStudy} />
                <PostTagsShare {...caseStudy} location={props.location} />
                <PostComments {...caseStudy} />

                {/* <PostFooter {...{ previous, next }} /> */}
              </Card>
            </Main>
            <Box sx={{ pl: `3`, flexBasis: `1/4`, display: ['none', `block`] }}>
              {/*<AuthorCompact author={caseStudy.author.node} omitTitle />*/}
              <Divider />
            </Box>
          </Stack>
          <Divider />
          <Footer content={content['footer']} />
        </>
      )}
    </Layout>
  );
}
