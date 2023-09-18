/**
 * Placeholder component to shadow
 */

import React, { useEffect } from 'react'
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
import Categories from '@solid-ui-blocks/Categories'
import NewsletterExpanded from '@solid-ui-blocks/NewsletterExpanded'
import Products from '@solid-ui-blocks/Products/Block01'
import BannerHorizontal from '@solid-ui-blocks/BannerHorizontal'
import BannerVertical from '@solid-ui-blocks/BannerVertical'
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/ducks/productSlice';
import { normalizeBlockContentNodes } from '@blocks-helpers';

const auth = typeof window !== 'undefined' ? localStorage.getItem("auth") : null
const parsedData = JSON.parse(auth);

const RenderProduct = ({ data: { allBlockContent }, ...props}) => {

  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.allProducts);
  useEffect(() => {
    dispatch(fetchProducts({ token: parsedData && parsedData.authToken })); // Fetch products from WooCommerce when the component mounts
    // dispatch(filterByCategory(categoryId));
  }, [dispatch]);

 
  
  return (
    <Layout {...props}>
    <Seo title='Home' />
    <Header content={content['header']} />
    <Divider />
    <Products products={products} content={content['latest-blogs']} />
   
    <Footer content={content['footer']} />
  </Layout>
  )
}


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

export default RenderProduct