import React, { useContext } from 'react';
import { Box, Card, Flex, Button } from 'theme-ui';
import rv from '@solid-ui-components/utils/buildResponsiveVariant';
import columnSizeMatcher from '@solid-ui-components/utils/columnSizeMatcher';
import Body from './Card.Body';
import Footer from './Card.Footer';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  clearCart,
} from '../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/cartSlice';
import { addToSubscription } from '../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/subscriptionSlice';
import Media from './Card.Media';
import { ModalContext } from '@solid-ui-components/Modal';

const styles = {
  card: {
    overflow: `hidden`,
    height: `full`,
    py: 4,
  },
  content: {
    alignItems: `stretch`,
    height: `full`,
  },
};

const CardBase = ({
  columns,
  withModerate,
  onMouseOver,
  subscription,
  ...props
}) => {
  const { setActiveModal } = useContext(ModalContext);

  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const handleAddToCart = item => {
    dispatch(addToCart(item));
    if (cartItems.length === 0) {
      setActiveModal('cart');
    }
    // Cart data will be automatically saved to local storage
  };

  function subCheckout(item) {
    if (subscription) {
      dispatch(addToSubscription(item));
      navigate('/checkout');
    } else {
      handleAddToCart(item);
    }
  }
  return (
    <Box
      className="blog_card"
      sx={columnSizeMatcher(columns)}
      onMouseOver={onMouseOver}
      onFocus={onMouseOver}
    >
      <Card
        variant="interactive"
        sx={{
          ...styles.card,
          variant: rv(props.variant, 'card'),
        }}
      >
        <Flex
          as="article"
          sx={{
            ...styles.content,
            variant: rv(props.variant, 'content'),
          }}
        >
          <Media withModerate {...props} />
          <Body {...props}></Body>
          <Flex sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Button
              sx={{ width: '200px' }}
              onClick={() => subCheckout(props)}
              variant="secondary"
            >
              {subscription ? 'Subscribe' : 'Add To Cart'}
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
};

export default CardBase;
