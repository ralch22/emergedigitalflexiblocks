import React, { useEffect } from 'react';
import { Box, Text, Button, Heading, Progress } from 'theme-ui';
import { Script } from "gatsby"

const Element = ({ total }) => {
    useEffect(() => {
        // Initialize goSellElements when the component mounts
        const goSell = window.goSell;
    
        goSell.goSellElements({
          containerID: "root",
          gateway: {
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
          },
          order: {
            amount: "800",
            currency: "USD",
          },
          transaction: {
            mode: `charge`,
          },
          charge: {
            threeDSecure: false,
            redirect: "/",
            post: "/",
            hashstring: "",
          }
        });
      }, []);
        return (
          <Box>
            <Script type="text/javascript" src="https://goSellJSLib.b-cdn.net/v2.0.0/js/gosell.js" />
            <div id="root"></div>
            <p id="msg"></p>
            <button id="submit-elements" onClick={() => typeof window === undefined ? window.goSell.submit() : null}>Submit</button>
          </Box>
        );
};

export default Element;
