import Address from '@solid-ui-blocks/Address/Block01/Block01';
import React, { useState } from 'react';
import { Box, Text, Button, Heading, Progress } from 'theme-ui';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import OrderConfirmationPage from '@solid-ui-blocks/Order/Block01';
import { GoSellElements } from "@tap-payments/gosell";
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'gatsby'
import { createSub } from '../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/subsSlice';
import { clearSubscription } from '../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/subscriptionSlice';

const steps = [
  'Shipping Information',
  'order.Billing Information',
  'Payment Information',
  'Review and Confirm',
];

const auth = typeof window !== 'undefined' ? localStorage.getItem("auth") : null
const parsedData = JSON.parse(auth);


const CheckoutForm = ({ allBlockContent }) => {
  const order = useSelector((state) => state.checkout.order);
  const dispatch = useDispatch();
  const sub = useSelector((state) => state.subscription);
  console.log("order", order)
  const [step, setStep] = useState(1);
  function callbackFunc(response) {    
    // Payment or subscription was successful
    // Redirect to a success page or perform other actions
    dispatch(createSub({ data: order, id: parsedData ? parsedData.user.id : '' }));
    dispatch(clearSubscription());
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
            {/* Add your order.billing information fields here */}
          </Box>
        );
      case 2:
        return (
          <Box>
            <OrderConfirmationPage subscription />
          </Box>
        );
      case 3:
        return (
          <Box>

<GoSellElements
              gateway={{
                publicKey: "pk_test_J0yAKjFBHwPS8atf2DTx5q6Y",
                secretKey: "sk_test_daBsQDPzn43TrCWXxFlGIq2A",
                language: "en",
                supportedCurrencies: "all",
                supportedPaymentMethods: "all",
                saveCardOption: true,
                customerCards: true,
                notifications: "msg",
                callback: callbackFunc,
                customer: {
                  id: parsedData && parsedData.user.id,
                  first_name: order.billing.first_name,
                  last_name: order.billing.last_name,
                  email: order.billing.email,
                  phone: order.billing.phone
                },
                labels: {
                  cardNumber: "Card Number",
                  expirationDate: "MM/YY",
                  cvv: "CVV",
                  cardHolder: "Name on Card",
                  actionButton: "Pay",
                },
                style: {
                  base: {
                    color: "#535353",
                    lineHeight: "18px",
                    fontFamily: "sans-serif",
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {
                      color: "rgba(0, 0, 0, 0.26)",
                      fontSize: "15px",
                    },
                  },
                  invalid: {
                    color: "red",
                    iconColor: "#fa755a ",
                  },
                },
              }}
              order={{
                amount: "800",
                currency: "USD",
              }}
              transaction={{
                mode: `save_card`,
              }}
              charge={{
                threeDSecure: false,
                redirect: "/",
                post: "/",
                hashstring: "",
              }}
            />
            <p id="msg"></p>
          </Box>
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
          <Button variant="secondary" onClick={GoSellElements.submit()} ml={2}>
            Complete Purchase
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CheckoutForm;
