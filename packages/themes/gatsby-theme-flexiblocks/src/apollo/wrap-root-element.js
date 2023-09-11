// gatsby-browser.js

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './client'; // Adjust the import path

export const wrapRootElement = ({ element }) => {
  // Create the Apollo Client instance
  const client = createApolloClient();

  // Wrap the UI components with Apollo and Theme UI providers
  return (
    <ApolloProvider client={client}>
      {element}
    </ApolloProvider>
  );
};
