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
import Hero from '@solid-ui-blocks/Hero/Block04/Block04';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCaseStudies } from '../store/ducks/caseSlice';

import { normalizeBlockContentNodes } from '@blocks-helpers';

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
  const uri = props.path;
  const filter = allWpPage.nodes.filter(page => {
    return page.uri === uri;
  });
  const post = filter[0];
  return (
    <Layout {...props}>
      <Seo post={post} />
      <Header content={content['header']} />
      <ModalWithTabs content={content['authentication']} reverse />
      <ModalWithTabs content={content['contact']} />
      <ModalSimple content={content['advertisement']} />
      <ModalCart content={content['cart']} />
      <Hero content={content['page-title']} />
      <Divider spaceY="5" />
      <Container>
        <Cases
          cases={caseStudies}
          status={status}
          content={content['all-cases']}
        />
      </Container>
      <Divider spaceY="5" />
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
