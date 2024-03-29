/**
 * Placeholder component to shadow
 */

import React, { useEffect } from 'react';
import Layout from '@solid-ui-layout/Layout';
import { graphql } from 'gatsby';
import { Container } from 'theme-ui';
import Footer from '@solid-ui-blocks/Footer/Block01';
import Header from '@solid-ui-blocks/Header/Block01';
import Divider from '@solid-ui-components/Divider';
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01';
import ModalSimple from '@solid-ui-blocks/Modal/Block02';
import ModalCart from '@solid-ui-blocks/Modal/Block03';
import Seo from 'gatsby-plugin-wpgraphql-seo';
import Hero from '@solid-ui-blocks/Hero/Block04/Block04';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCaseStudies } from '../store/ducks/caseSlice';

import { normalizeBlockContentNodes } from '@blocks-helpers';
import Head from '@solid-ui-blocks/Head';

const auth =
  typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
const parsedData = JSON.parse(auth);

const Privacy = ({ data: { allBlockContent, allWpPage }, ...props }) => {
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  const dispatch = useDispatch();
  const { caseStudies, status, error } = useSelector(state => state.case);

  useEffect(() => {
    dispatch(fetchCaseStudies());
  }, [dispatch]);
  const uri = props.path;
  const filter = allWpPage.nodes.filter(page => {
    return page.slug === 'terms-condition';
  });
  const post = filter[0];

  return (
    <Layout {...props}>
      <Head />
      <Seo post={post} />
      <Header content={content['header']} />
      <ModalWithTabs content={content['authentication']} reverse />
      <ModalWithTabs content={content['contact']} />
      <ModalSimple content={content['advertisement']} />
      <ModalCart content={content['cart']} />
      <Hero content={content['term']} />
      <Divider space="5" />
      <Container>
        {post && <div dangerouslySetInnerHTML={{ __html: post.content }} />}
      </Container>

      <Footer content={content['footer']} />
    </Layout>
  );
};

export const query = graphql`
  query homepageMarketingBlockContent {
    allBlockContent(
      filter: { page: { in: ["homepage/marketing", "shared", "others"] } }
    ) {
      nodes {
        ...BlockContent
      }
    }
    allWpPage {
      nodes {
        nodeType
        slug
        title
        content
        uri
        seo {
          title
          metaDesc
          focuskw
          metaKeywords
          metaRobotsNoindex
          metaRobotsNofollow
          opengraphTitle
          opengraphDescription
          opengraphImage {
            altText
            sourceUrl
            srcSet
          }
          twitterTitle
          twitterDescription
          twitterImage {
            altText
            sourceUrl
            srcSet
          }
          canonical
          cornerstone
          schema {
            articleType
            pageType
            raw
          }
        }
      }
    }
  }
`;

export default Privacy;
