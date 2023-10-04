/**
 * Placeholder component to shadow
 */

import React from 'react';
import Layout from '@solid-ui-layout/Layout';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import Footer from '@solid-ui-blocks/Footer/Block01';
import Header from '@solid-ui-blocks/Header/Block01';
import { Badge, Box, Button, Container, Flex, Grid, Heading } from 'theme-ui';
import Divider from '@solid-ui-components/Divider';
import { addToSubscription } from '@elegantstack/gatsby-theme-flexiblocks/src/store/ducks/subscriptionSlice';
import { navigate } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@elegantstack/gatsby-theme-flexiblocks/src/store/ducks/cartSlice';

export default function RenderPost({ data: { allBlockContent }, ...props }) {
  const { pageContext: { post, services = {} } = {} } = props;
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);

  const cartItems = useSelector(state => state.cart);
  const sub = useSelector(state => state.subscription);
  const dispatch = useDispatch();
  const handleAddToCart = item => {
    dispatch(addToCart(item));

    // Cart data will be automatically saved to local storage
  };

  function subCheckout(item) {
    if (subscription) {
      dispatch(addToSubscription(item));
      navigate('/checkout2');
    } else {
      handleAddToCart(item);
    }
  }

  return (
    <Layout {...props}>
      <head dangerouslySetInnerHTML={{ __html: post.yoast_head }} />
      <Header content={content['header']} />
      <Divider space="5" />
      <Container>
        <Grid columns={[1, 2]} gap={2}>
          <Box>
            <img alt={post.name} src={post.images && post.images[0].src} />
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Heading
              variant="h2"
              dangerouslySetInnerHTML={{ __html: post.name }}
            />
            <Heading
              variant="h2"
              dangerouslySetInnerHTML={{ __html: post.price_html }}
            />
            <Flex>
              Categories:{' '}
              {post.categories.map(({ name, slug }) => {
                return (
                  <Box sx={{ ml: 2 }}>
                    <Badge variant="tag">{name}</Badge>
                  </Box>
                );
              })}
            </Flex>
            <Divider space="3" />
            <Flex>
              Tags:{' '}
              {post.tags.map(({ name, slug }) => {
                return (
                  <Box sx={{ ml: 2 }}>
                    <Badge variant="tag">{name}</Badge>
                  </Box>
                );
              })}
            </Flex>
            <Divider space="3" />
            <Button
              sx={{ width: '200px' }}
              onClick={() => subCheckout(post)}
              variant="secondary"
            >
              {post.product_type === 'subscription'
                ? 'Subscribe'
                : 'Add To Cart'}
            </Button>
          </Box>
        </Grid>
      </Container>
      <Divider space="5" />
      <Footer content={content['footer']} />
    </Layout>
  );
}
