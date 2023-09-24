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
};

export default Element;
