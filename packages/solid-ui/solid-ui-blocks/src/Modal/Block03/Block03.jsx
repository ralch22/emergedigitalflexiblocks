import React, { useEffect } from 'react';
import { Box, Card, Flex, Heading, Select, Text } from 'theme-ui';
import Divider from '@solid-ui-components/Divider';
import Modal from '@solid-ui-components/Modal';
import ContentText from '@solid-ui-components/ContentText';
import ContentButtons from '@solid-ui-components/ContentButtons';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/cartSlice';
import { fetchShipmentMethods } from '../../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/methodSlice';
import CartTable from '@solid-ui-blocks/CartTable/Block01';
import { addLineShipping } from '../../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/checkoutSlice';

const calculateTotalPrice = cartItems => {
  return cartItems.reduce((total, item) => {
    // Calculate the subtotal for each item (price * quantity)
    const itemSubtotal = item.price * item.quantity;

    // Add the item's subtotal to the total
    return total + itemSubtotal;
  }, 0); // Initialize total to 0
};

const ModalBlock02 = ({ content: { identifier, text, images, buttons } }) => {
  const cartItems = useSelector(state => state.cart);
  const shipmentMethod = useSelector(state => state.method.shipment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShipmentMethods());
    // dispatch(addLineShipping(shipmentMethod));
  }, [dispatch]);
  const handleAddToCart = item => {
    dispatch(addToCart(item));
    // Cart data will be automatically saved to local storage
  };

  const handleRemoveFromCart = itemId => {
    dispatch(removeFromCart(itemId));
    // Cart data will be automatically saved to local storage
  };

  const decreaseCartQuantity = itemId => {
    dispatch(decreaseQuantity(itemId));
  };

  const increaseCartQuantity = itemId => {
    dispatch(increaseQuantity(itemId));
  };

  function handleSelect(event) {
    const selectedMethod = event.target.value;
    const filtered = shipmentMethod.filter(product => {
      return product.id === selectedMethod;
    });
    const items = filtered.map(node => ({
      method_id: node.id,
      method_title: node.title,
    }));

    dispatch(addLineShipping(items));
  }

  const totalPrice = calculateTotalPrice(cartItems);

  return (
    <Modal
      id={identifier}
      contentStyles={{ maxWidth: 1100, p: 0, minHeight: '500px' }}
    >
      <Box sx={{ p: 4, height: 'full' }}>
        <Box sx={{ textAlign: `center` }}>
          <ContentText content={text} />
        </Box>
        {cartItems.length == 0 ? (
          <Flex
            sx={{
              height: '100%',
              textAlign: `center`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>Nothing is Added To the Cart</Text>
          </Flex>
        ) : (
          <Flex sx={{ flexDirection: [`column`, null, `row`] }}>
            <CartTable
              increaseCartQuantity={increaseCartQuantity}
              decreaseCartQuantity={decreaseCartQuantity}
              cartItems={cartItems}
              handleRemoveFromCart={handleRemoveFromCart}
            />
            <Box sx={{ flexBasis: '30%', p: 3 }}>
              <Card sx={{ borderRadius: 5, p: 3 }}>
                <Flex sx={{ justifyContent: 'space-between', mb: 5 }}>
                  <Heading>Total</Heading>
                  <Text variant="large">$ {totalPrice}</Text>
                </Flex>
                <Select
                  id="shipmentMethod"
                  defaultValue="Select a method"
                  sx={{ mb: 5 }}
                  onChange={handleSelect}
                  arrow={
                    <Box
                      as="svg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentcolor"
                      sx={{
                        ml: -28,
                        alignSelf: 'center',
                        pointerEvents: 'none',
                      }}
                    >
                      <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
                    </Box>
                  }
                >
                  {shipmentMethod.map(method => (
                    <option
                      sx={{ width: '200px' }}
                      key={method.id}
                      value={method.id}
                    >
                      {method.title}
                    </option>
                  ))}
                </Select>
                <ContentButtons content={buttons} />
                <Divider spaceY="3" />
                <Text>We Accept: </Text>
                <Flex>
                  {images.map(({ src, alt }, index) => {
                    return (
                      <img
                        width={50}
                        height={30}
                        src={src.publicURL}
                        alt={alt}
                        key={index}
                      />
                    );
                  })}
                </Flex>
              </Card>
            </Box>
          </Flex>
        )}
      </Box>
    </Modal>
  );
};

export default ModalBlock02
