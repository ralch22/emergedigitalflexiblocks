// OrderConfirmationPage.js

import React from 'react';
import { Box, Heading, Text, Button, Flex } from 'theme-ui';
import { useSelector } from 'react-redux';

const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => {
    // Calculate the subtotal for each item (price * quantity)
    const itemSubtotal = item.price * item.quantity;
    
    // Add the item's subtotal to the total
    return total + itemSubtotal;
  }, 0); // Initialize total to 0
};

function OrderConfirmationPage() {
  const cartItems = useSelector((state) => state.cart);
  const { billing: userBilling, shipping: userShipping } = useSelector((state) => state.checkout);
  const totalPrice = calculateTotalPrice(cartItems);

  return (
    <Box sx={{ maxWidth: '600px', mx: 'auto', py: 4 }}>
      <Heading as="h1" sx={{ fontSize: 4, mb: 3 }}>
        Order Confirmation
      </Heading>
      <Box sx={{ bg: 'background', p: 3, mt: 4, borderRadius: 'default', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <Heading as="h2" sx={{ fontSize: 3, mb: 3 }}>
          Products
        </Heading>
       {cartItems.map((p, index) => {
        return (
          <Flex sx={{ flexDirection: 'column', width: `full`, mt: '4' }}>
            <Text sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>Name:</strong> {p.name}
            </Text>
            <Text sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>Quantity:</strong> {p.quantity}
            </Text>
            <Text sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>Price:</strong> ${p.price}
            </Text>
            <Text sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>${calculateTotalPrice(cartItems)}</strong> 
            </Text>
          </Flex>
        )
       })}
        {/* Add more billing information here */}
      </Box>
      <Box sx={{ bg: 'background', p: 3, mt: 4, borderRadius: 'default', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <Heading as="h2" sx={{ fontSize: 3, mb: 3 }}>
          Billing Information
        </Heading>
        <Text>
          <strong>First Name:</strong> {userBilling.first_name}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>Last Name:</strong> {userBilling.last_name}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>Company:</strong> {userBilling.company}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>Address 1:</strong> {userBilling.address_1}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>Address 2:</strong> {userBilling.address_2}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>City:</strong> {userBilling.city}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>State:</strong> {userBilling.state}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>Postcode:</strong> {userBilling.postcode}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>Country:</strong> {userBilling.country}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>Email:</strong> {userBilling.email}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>Phone:</strong> {userBilling.phone}
        </Text>
        {/* Add more billing information here */}
      </Box>
      <Box sx={{ bg: 'background', p: 3, mt: 4, borderRadius: 'default', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <Heading as="h2" sx={{ fontSize: 3, mb: 3 }}>
          Shipping Information
        </Heading>
        <Text>
          <strong>First Name:</strong> {userShipping.first_name}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>Last Name:</strong> {userShipping.last_name}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>Company:</strong> {userShipping.company}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>Address 1:</strong> {userShipping.address_1}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>Address 2:</strong> {userShipping.address_2}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>City:</strong> {userShipping.city}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>State:</strong> {userShipping.state}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>Postcode:</strong> {userShipping.postcode}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>Country:</strong> {userShipping.country}
        </Text>
        <Text sx={{ mb: '3' }}>
          <strong>Email:</strong> {userShipping.email}
        </Text>
        {/* Add more shipping information here */}
      </Box>
    </Box>
  );
}

export default OrderConfirmationPage;
