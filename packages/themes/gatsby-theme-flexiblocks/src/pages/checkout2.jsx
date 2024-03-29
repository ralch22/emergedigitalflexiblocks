import React, { useEffect } from 'react';
import Layout from '@solid-ui-layout/Layout';
import Footer from '@solid-ui-blocks/Footer/Block01';
import Header from '@solid-ui-blocks/Header/Block01';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'theme-ui';
import Divider from '@solid-ui-components/Divider';
import { graphql } from 'gatsby';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import Checkout from '@solid-ui-blocks/Checkout2/index';
import { addLineItems } from '../store/ducks/checkoutSlice';

export default function user({ data: { allBlockContent }, ...props }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.subscription);
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);

  //   const { data: userData } = userResult;

  const items = cartItems.map(node => ({
    product_id: node.id,
    quantity: node.quantity,
  }));

  useEffect(() => {
    dispatch(addLineItems(items));
  }, []);

  return (
    <Layout {...props}>
      <Header content={content['header']} />
      <Divider spaceY="5" />
      <Box sx={{ py: '5' }}>
        <Checkout allBlockContent={allBlockContent} />
      </Box>
      <Divider spaceY="5" />
      <Footer content={content['footer']} />
    </Layout>
  );
}

export const query = graphql`
  query homepageMarketingBlockContent {
    allBlockContent(
      filter: { page: { in: ["innerpage/marketing", "shared"] } }
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
