import React, { useState } from 'react';
import { Box, Text, Button, Heading, Progress } from 'theme-ui';

import { GoSellElements } from "@tap-payments/gosell";


const Element = () => {
        return (
          <Box>
           <GoSellElements
               gateway={{
                 publicKey: "pk_test_J0yAKjFBHwPS8atf2DTx5q6Y",
                 secretKey: "sk_test_daBsQDPzn43TrCWXxFlGIq2A",
                 language: "en",
                 supportedCurrencies: "all",
                 supportedPaymentMethods: "all",
                 notifications: "msg",
                 callback: callbackFunc,
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
                 amount: "100",
                 currency: "BHD",
               }}
               transaction={{
                 mode: "charge",
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
};

export default Element;
