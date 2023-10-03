// gatsby-browser.js

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './client'; // Adjust the import path
import store from '../store/config';
import { Provider } from 'react-redux';

export const wrapRootElement = ({ element }) => {
  // Create the Apollo Client instance
  const client = createApolloClient();

  // Wrap the UI components with Apollo and Theme UI providers
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>{element}</ApolloProvider>
    </Provider>
  );
};
