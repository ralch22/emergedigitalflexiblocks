// apollo-client.js

import fetch from 'isomorphic-fetch';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { afterwareLink, middlewareLink } from './links';

// Function to create and configure the Apollo Client
export function createApolloClient() {
  const httpLink = createHttpLink({
    uri: `https://emergedigital.ae/graphql`,
    fetch,
  });

  const authLink = setContext((_, { headers }) => {
    const session = localStorage.getItem('woo-session');
    const auth = JSON.parse(localStorage.getItem('auth'));

    const headersData = {};

    if (session) {
      headersData['woocommerce-session'] = `Session ${session}`;
    }

    if (auth && auth.authToken) {
      headersData['authorization'] = `Bearer ${auth.authToken}`;
    }

    return {
      headers: {
        ...headers,
        ...headersData,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(middlewareLink).concat(afterwareLink).concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true
  });

  return client;
}
