/**
 * Placeholder component to shadow
 */

import React, { useEffect, useState } from 'react'
import Layout from '@solid-ui-layout/Layout'
import Stack from '@solid-ui-layout/Stack/Stack'
import { graphql } from 'gatsby'
import Main from '@solid-ui-layout/Main/Main'
import Footer from '@solid-ui-blocks/Footer/Block01';
import Header from '@solid-ui-blocks/Header/Block01';
import { Box } from 'theme-ui'
import ProductList from '@solid-ui-components/ProductList'
import Divider from '@solid-ui-components/Divider'
import Seo from '@solid-ui-blocks/Seo'
import { useDispatch, useSelector } from 'react-redux';
import Products from '@solid-ui-blocks/Products/Block01'

import { normalizeBlockContentNodes } from '@blocks-helpers';

const auth = typeof window !== 'undefined' ? localStorage.getItem("auth") : null
const parsedData = JSON.parse(auth);

import React, { useEffect } from 'react';
import { fetchCaseStudies } from '../store/ducks/caseSlice';

const CaseStudiesList = (props) => {
  const dispatch = useDispatch();
  const caseStudies = useSelector((state) => state.case.caseStudies);
  const status = useSelector((state) => state.caseStudies.status);
  const error = useSelector((state) => state.caseStudies.error);
  console.log("studies", caseStudies)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCaseStudies());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout {...props}>
    <Seo title='Home' />
    <Header content={content['header']} />
    <Divider />
    {/* <Products products={products} content={content['latest-blogs']} /> */}
   
    <Footer content={content['footer']} />
  </Layout>
  );
};

export const pageQuery = graphql`
  query PostsPageQuery {
    allBlockContent(
      filter: { page: { in: ["innerpage/products", "shared"] } }
   ) {
      nodes {
        ...BlockContent
      }
    }
 
}
`

export default CaseStudiesList;
