import React from 'react';
import { Provider } from 'urql';
import { client } from './src/apollo/client'; // Import your urql client

export const wrapRootElement = ({ element }) => (
  <Provider value={client}>
    {element}
  </Provider>
);