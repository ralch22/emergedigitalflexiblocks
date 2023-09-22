import React, { useEffect } from 'react'
import { Flex, Box, Grid, Heading, Text, Card, Select } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import Modal from '@solid-ui-components/Modal'
import ListItem from '@solid-ui-components/ListItem'
import ContentText from '@solid-ui-components/ContentText'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentButtons from '@solid-ui-components/ContentButtons'
import rv from '@solid-ui-components/utils/buildResponsiveVariant'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, decreaseQuantity, increaseQuantity } from '../../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/cartSlice';
import { fetchShipmentMethods } from '../../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/methodSlice';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa'
import CartTable from '@solid-ui-blocks/CartTable/Block01'
import { addLineShipping, getShippingMethod } from '../../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/checkoutSlice'

const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => {
    // Calculate the subtotal for each item (price * quantity)
    const itemSubtotal = item.price * item.quantity;
    
    // Add the item's subtotal to the total
    return total + itemSubtotal;
  }, 0); // Initialize total to 0
};

const ModalBlock02 = ({ content: { identifier, text, images, buttons } }) => {
  const cartItems = useSelector((state) => state.cart);
  const shipmentMethod = useSelector((state) => state.method.shipment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShipmentMethods());
    // dispatch(addLineShipping(shipmentMethod));
  }, [dispatch])
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    // Cart data will be automatically saved to local storage
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    // Cart data will be automatically saved to local storage
  };

  const decreaseCartQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  }

  const increaseCartQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  }

  function handleSelect(event) {
    const selectedMethod = event.target.value;
    const filtered = shipmentMethod.filter((product) => {
      return product.id === selectedMethod;
    })
    const items = filtered.map((node) => ({
      method_id: node.id,
      method_title: node.title
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
        <Flex sx={{ height: '100%', textAlign: `center`, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
          <Text>Nothing is Added To the Cart</Text>
        </Flex>
      ): (
        <Flex>
        {/* <Grid 
          columns={[1, 2]} 
          gap={4}
          sx={{
            alignItems: `stretch`,
            overflowY: `scroll`,
            height: `60vh`,
            maxHeight: `750px`,
            flexWrap: "wrap",
            flexBasis: "70%"
          }}
        >
          
            {cartItems && cartItems.map((product) => {
              const src = product.images[0].src
              return (
                <Box
               
              >
                
                <img src={src} alt="" />
                
                
                <Text dangerouslySetInnerHTML={{ __html: product.name }} variant="h4" sx={{ variant: rv(product.variant, 'title') }} />
                <Text dangerouslySetInnerHTML={{ __html: product.price_html }} variant="h4" sx={{ variant: rv(product.variant, 'large') }} />
                <Flex sx={{ justifyContent: 'space-between', mt: 3 }}>
                  <Box sx={{ width: '30px', height: '30px', borderRadius: '50%', padding: '10px', background: "#bf002e", display: "flex", justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                  <FaTimes color="#fff" onClick={() => handleRemoveFromCart(product.id)} />
                  </Box>
                  <Text>{product.quantity}</Text>
                  <Flex>
                  <Box sx={{ width: '30px', height: '30px', borderRadius: '50%', padding: '10px', background: "#cbd5e0", display: "flex", justifyContent: 'center', alignItems: 'center', cursor: 'pointer', mr: 2 }}>
                  <FaPlus color="#fff" onClick={() => increaseCartQuantity(product.id)} />
                  </Box>
                  <Box sx={{ width: '30px', height: '30px', borderRadius: '50%', padding: '10px', background: "#cbd5e0", display: "flex", justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                  <FaMinus color="#fff" onClick={() => decreaseCartQuantity(product.id)} />
                  </Box>
                    
                  </Flex>
                </Flex>
              </Box>
                )
              })}
        </Grid> */}
        <CartTable increaseCartQuantity={increaseCartQuantity} decreaseCartQuantity={decreaseCartQuantity} cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />
        <Box sx={{ flexBasis: "30%", p: 3 }}>
          <Card sx={{ borderRadius: 5, p: 3 }}>
            <Flex  sx={{ justifyContent: 'space-between', mb: 5 }}>
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
                  }}>
                  <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
                </Box>
              }
            >
              {shipmentMethod.map((method) => (
                <option sx={{ width: '200px' }} key={method.id} value={method.id}>
                  {method.title}
                </option>
              ))}
            </Select>
            <ContentButtons content={buttons} />
            <Divider spaceY="3" /> 
            <Text>We Accept: </Text>
            {images.map((image, index) => (
              <img key={index} src={image.src} alt={image.alt} />
            ))}
          </Card>
        </Box>
        </Flex>
      )}
      </Box>
    </Modal>
  )
}

export default ModalBlock02
