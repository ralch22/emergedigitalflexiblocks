// apollo-client.js

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { gql } from '@apollo/client'; // Import gql to define GraphQL queries/mutations
import { afterwareLink, middlewareLink } from './links';
import { handleLogout } from '../utils/functions'

// Function to create and configure the Apollo Client
export function createApolloClient() {
  const httpLink = createHttpLink({
    uri: `https://emergedigital.ae/graphql`,
    fetch,
  });

  const authLink = setContext(async (_, { headers }) => {
    const session = localStorage.getItem('woo-session');
    const auth = JSON.parse(localStorage.getItem('auth'));

    const headersData = {};

    if (session) {
      headersData['woocommerce-session'] = `Session ${session}`;
    }

    if (auth && auth.authToken) {
      const tokenExpiration = auth.tokenExpiration;
      if (tokenExpiration && tokenExpiration <= Date.now() / 1000) {
        // Token has expired, initiate token refresh logic
        const refreshedToken = await refreshAuthToken(auth.refreshToken); // Call the new refresh function
        if (refreshedToken) {
          // Token refresh successful, update local storage
          auth.authToken = refreshedToken;
          localStorage.setItem('auth', JSON.stringify(auth));
        } else {
          // Token refresh failed, handle accordingly (e.g., log out the user)
          handleLogout();
        }
      }

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
    connectToDevTools: true,
  });

  return client;
}

// Define the token refresh mutation using gql
const REFRESH_AUTH_TOKEN = gql`
  mutation RefreshAuthToken($input: RefreshJwtAuthTokenInput!) {
    refreshJwtAuthToken(input: $input) {
      authToken
    }
  }
`;

// Implement the refreshAuthToken function
async function refreshAuthToken(refreshToken) {
  try {
    const response = await client.mutate({
      mutation: REFRESH_AUTH_TOKEN,
      variables: {
        input: {
          clientMutationId: uuidv4(), // Use a unique ID
          jwtRefreshToken: refreshToken, // Use the stored refresh token
        },
      },
    });

    if (response.data && response.data.refreshJwtAuthToken && response.data.refreshJwtAuthToken.authToken) {
      return response.data.refreshJwtAuthToken.authToken;
    }
  } catch (error) {
    console.error('Token refresh failed:', error.message);
  }

  return null;
}
