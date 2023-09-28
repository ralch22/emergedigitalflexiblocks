/**
 * Placeholder component to shadow
 */

import React, { useEffect, useState } from 'react'
import { Card, Box  } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Stack from '@solid-ui-layout/Stack/Stack'
import Main from '@solid-ui-layout/Main/Main'
import Footer from '@solid-ui-blocks/Footer/Block01';
import Header from '@solid-ui-blocks/Header/Block01';
import CardList from '@solid-ui-components/CardList'
import Divider from '@solid-ui-components/Divider'
import Sticky from '@solid-ui-components/Sticky'
import Seo from '@solid-ui-blocks/Seo'
import AuthorCompact from '@solid-ui-blocks/AuthorCompact'
import TableOfContentsCompact from '@solid-ui-blocks/TableOfContentsCompact'
import {
  PostHead,
  PostImage,
  PostBody,
  PostComments,
  PostCommentsFacebook,
  PostCommentsGraph,
  PostTagsShare,
  PostFooter
} from '@solid-ui-blocks/Post'
import { normalizeBlockContentNodes } from '@blocks-helpers';



export default function Post({ pageContext }) {
      const { slug } = pageContext;
      const [caseStudy, setCaseStudy] = useState(null);
    
      useEffect(() => {
        async function fetchCaseStudy() {
          try {
            const response = await fetch(
              `https://emergedigital.ae/wp-json/wp/v2/case-studies?slug=${slug}`
            );
            setCaseStudy(response.data[0]);
          } catch (error) {
            console.error('Error fetching case study:', error);
          }
        }
    
        fetchCaseStudy();
      }, [slug]);
    
      if (!caseStudy) {
        return <div>Loading...</div>;
      }

      const content = normalizeBlockContentNodes(allBlockContent?.nodes);
      return (
        <Layout {...props}>
          <Seo {...caseStudy} siteUrl={siteUrl} />
          <Header search content={content['header']} />
          <div style={{ marginTop: `5rem` }}>

            <Stack  effectProps={{ effect: 'fadeInDown' }}>
            
              <PostHead {...caseStudy} />
            </Stack>
          </div>
          <Divider />
          <Stack effectProps={{ effect: 'fadeInUp' }}>
            <Main>
              <Card variant='paper'>
                <PostImage {...caseStudy} inCard />
                <PostBody {...caseStudy} />
                <PostTagsShare {...caseStudy} location={props.location} />
                {services.disqus && <PostComments {...caseStudy} />}
                {services.graphComment && <PostCommentsGraph {...caseStudy} />}
                {services.facebookComment && (
                  <PostCommentsFacebook {...caseStudy} siteUrl={siteUrl} />
                )}
                {/* <PostFooter {...{ previous, next }} /> */}
              </Card>
            </Main>
            <Box sx={{ pl: `3`, flexBasis: `1/4`, display: ['none', `block`]}}>
              <AuthorCompact author={caseStudy.author.node} omitTitle />
              <Divider />
            </Box>
          </Stack>
          <Divider />
          <Footer content={content['footer']} />
        </Layout>
      )
}
