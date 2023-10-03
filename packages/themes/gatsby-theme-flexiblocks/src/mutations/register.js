import { gql } from '@apollo/client';

/**
 * Register customer mutation query.
 */
// Define your GraphQL mutation for user registration
const REGISTER = gql`
  mutation REGISTER($input: RegisterUserInput!) {
    registerUser(input: $input) {
      user {
        id
        username
        name
        email
        jwtAuthToken
        jwtRefreshToken
        jwtAuthExpiration
      }
    }
  }
`;

export default REGISTER;
