// apollo-links.js

import { ApolloLink } from '@apollo/client';
import { isEmpty } from 'lodash';

// Middleware operation
export const middlewareLink = new ApolloLink((operation, forward) => {
  let headersData = null;

  const session = localStorage.getItem('woo-session');

  if (!isEmpty(session)) {
    headersData = {
      'woocommerce-session': `Session ${session}`,
    };
  }

  const auth = JSON.parse(localStorage.getItem('auth'));
  const token = !isEmpty(auth) ? auth.authToken : null;

  if (!isEmpty(token)) {
    headersData = {
      ...headersData,
      authorization: token ? `Bearer ${token}` : '',
    };
  }

  if (!isEmpty(headersData)) {
    operation.setContext(({ headers = {} }) => ({
      headers: headersData,
    }));
  }

  return forward(operation);
});

// Afterware operation
export const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;
    const session = headers.get('woocommerce-session');

    if (session) {
      if (session === 'false') {
        localStorage.removeItem('woo-session');
      } else if (localStorage.getItem('woo-session') !== session) {
        localStorage.setItem('woo-session', headers.get('woocommerce-session'));
      }
    }

    return response;
  });
});
