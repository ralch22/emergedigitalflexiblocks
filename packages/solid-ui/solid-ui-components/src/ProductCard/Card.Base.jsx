import React, { useContext } from 'react';
import { Box, Button, Card, Flex } from 'theme-ui';
import rv from '@solid-ui-components/utils/buildResponsiveVariant';
import columnSizeMatcher from '@solid-ui-components/utils/columnSizeMatcher';
import Body from './Card.Body';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/cartSlice';
import { addToSubscription } from '../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/subscriptionSlice';
import Media from './Card.Media';
import { navigate } from 'gatsby';
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
    flexDirection: `column`,
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
  const sub = useSelector(state => state.subscription);
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
      navigate('/checkout2');
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
          style={{ flexDirection: 'column' }}
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

export default CardBase
