import React from 'react'
import { Flex, Box, Grid, Heading, Text, Card } from 'theme-ui'
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
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa'
import CartTable from '@solid-ui-blocks/CartTable/Block01'

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
  const dispatch = useDispatch();
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
