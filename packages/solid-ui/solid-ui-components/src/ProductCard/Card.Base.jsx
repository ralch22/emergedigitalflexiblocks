import React from 'react'
import { Box, Card, Flex, Button } from 'theme-ui'
import rv from '@solid-ui-components/utils/buildResponsiveVariant'
import columnSizeMatcher from '@solid-ui-components/utils/columnSizeMatcher'
import Body from './Card.Body'
import Footer from './Card.Footer'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/cartSlice';
import Media from './Card.Media'

const styles = {
  card: {
    overflow: `hidden`,
    height: `full`,
    py: 4
  },
  content: {
    alignItems: `stretch`,
    height: `full`
  }
}

const CardBase = ({ columns, withModerate, onMouseOver, ...props }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));

    // Cart data will be automatically saved to local storage
  };
  return(
    <Box
      className='blog_card'
      sx={columnSizeMatcher(columns)}
      onMouseOver={onMouseOver}
      onFocus={onMouseOver}
    >
      <Card
        variant='interactive'
        sx={{
          ...styles.card,
          variant: rv(props.variant, 'card')
        }}
      >
        <Flex
          as='article'
          sx={{
            ...styles.content,
            variant: rv(props.variant, 'content')
          }}
        >
          <Media withModerate {...props} />
          <Body {...props}>
          
          </Body>
          <Flex sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Button sx={{ width: '200px' }} onClick={() => handleAddToCart(props)} variant="secondary">Add To Cart</Button>
          </Flex>
        </Flex>
      </Card>
    </Box>
  )
}

export default CardBase
