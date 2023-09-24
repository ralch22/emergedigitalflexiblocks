import User from '@solid-ui-blocks/User/Block01/Block01';
import Address from '@solid-ui-blocks/Address/Block01/Block01';
import React, { useState } from 'react';
import { Box, Text, Button, Heading, Progress } from 'theme-ui';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import OrderConfirmationPage from '@solid-ui-blocks/Order/Block01';
import { GoSellElements } from "@tap-payments/gosell";
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'gatsby'
import { createOrder } from '../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/orderSlice';
import { clearCart } from '../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/cartSlice';
import Element from "./Element"

const steps = [
  'Shipping Information',
  'Billing Information',
  'Payment Information',
  'Review and Confirm',
];

const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => {
    // Calculate the subtotal for each item (price * quantity)
    const itemSubtotal = item.price * item.quantity;
    
    // Add the item's subtotal to the total
    return total + itemSubtotal;
  }, 0); // Initialize total to 0
};

const CheckoutForm = ({ allBlockContent }) => {
  const order = useSelector((state) => state.checkout.order);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  function callbackFunc(response) {    
      // Payment or subscription was successful
      // Redirect to a success page or perform other actions
      dispatch(createOrder({ data: order }));
      dispatch(clearCart());
      navigate("/success")
  }
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = () => {
    
    const content = normalizeBlockContentNodes(allBlockContent?.nodes);
    switch (step) {
      case 1:
        return (
          <Box>
            <Address checkout content={content['address']} />
            {/* Add your billing information fields here */}
          </Box>
        );
      case 2:
        return (
          <Box>
            <OrderConfirmationPage />
          </Box>
        );
      case 3:
        return (
         <Element total={() => calculateTotalPrice(cart)} />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: '600px', mx: 'auto' }}>
      <Text sx={{ textAlign: 'center', mb: 4 }}>
        {step} / 4 - Checkout
      </Text>

      <Progress value={(step - 1) / (steps.length - 1)} max={1} variant="primary" color="#000" mb={4} />

      {renderStepContent()}

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        {step !== 1 && (
          <Button onClick={prevStep} variant="primary">
            Back
          </Button>
        )}

        {step !== 3 ? (
          <Button onClick={nextStep} variant="secondary" ml={2}>
            Continue
          </Button>
        ) : (
          <Button variant="secondary" onClick={() => GoSellElements.submit()} ml={2}>
            Complete Purchase
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CheckoutForm;
