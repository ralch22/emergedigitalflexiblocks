/**
 * Placeholder component to shadow
 */

import React, { useEffect } from 'react';
import Layout from '@solid-ui-layout/Layout';
import { graphql } from 'gatsby';
import Footer from '@solid-ui-blocks/Footer/Block01';
import Header from '@solid-ui-blocks/Header/Block01';
import Divider from '@solid-ui-components/Divider';
import Seo from '@solid-ui-blocks/Seo';
import Products from '@solid-ui-blocks/Products/Block01';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/ducks/productSlice';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import Hero from '@solid-ui-blocks/Hero/Block04';

const auth =
  typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
const parsedData = JSON.parse(auth);

const RenderProduct = ({ data: { allBlockContent }, ...props }) => {
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.allProducts);
  useEffect(() => {
    dispatch(fetchProducts({ token: parsedData && parsedData.authToken })); // Fetch products from WooCommerce when the component mounts
    // dispatch(filterByCategory(categoryId));
  }, [dispatch]);

  return (
    <Layout {...props}>
      <Seo title="Home" />
      <Header content={content['header']} />
      <Hero content={content['all-products']} />
      <Divider spaceY="5" />
      <Products all products={products} content={content['title']} />

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

export default RenderProduct;
