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
import Cases from '@solid-ui-blocks/Cases/Block01';
import Content from '@solid-ui-blocks/Content/Block01';
import styles from './_styles';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCaseStudies } from '../store/ducks/caseSlice';

import { normalizeBlockContentNodes } from '@blocks-helpers';
import { regexString } from '../utils/filter';

const auth =
  typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
const parsedData = JSON.parse(auth);

const CaseStudiesList = ({
  data: { allBlockContent, allWpPage },
  ...props
}) => {
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  const dispatch = useDispatch();
  const { caseStudies, status, error } = useSelector(state => state.case);

  useEffect(() => {
    dispatch(fetchCaseStudies());
  }, [dispatch]);
  const uri = regexString(props.uri);
  const filter = allWpPage.nodes.filter(page => {
    return page.slug === uri;
  });
  const post = filter[0];
  console.log(allWpPage.nodes);
  return (
    <Layout {...props}>
      <Seo post={post} />
      <Header content={content['header']} />
      <ModalWithTabs content={content['authentication']} reverse />
      <ModalWithTabs content={content['contact']} />
      <ModalSimple content={content['advertisement']} />
      <ModalCart content={content['cart']} />
      <Container variant="wide" sx={styles.heroContainer}>
        <Content pageTitle="hello" content={content['hero']} />
      </Container>
      <Divider />
      <Divider spaceY="5" />
      <Cases cases={caseStudies} content={content['all-cases']} />

      <Footer content={content['footer']} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query PostsPageQuery {
    allBlockContent(filter: { page: { in: ["innerpage/blog", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
    allWpPage {
      nodes {
        nodeType
        slug
        title
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

export default CaseStudiesList;
