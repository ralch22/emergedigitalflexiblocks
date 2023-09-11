import React from 'react';
import { Provider } from 'urql';
import { client } from '../../themes/gatsby-theme-flexiblocks/src/apollo/client'; // Import your urql client

export const wrapRootElement = ({ element }) => (
  <Provider value={client}>
    {element}
  </Provider>
);