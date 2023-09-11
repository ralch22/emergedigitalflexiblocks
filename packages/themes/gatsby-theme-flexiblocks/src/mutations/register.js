import { gql } from '@apollo/client'

/**
 * Register customer mutation query.
 */
// Define your GraphQL mutation for user registration
const REGISTER = gql`
  mutation REGISTER ($input: RegisterInput!) {
    register(input: $input) {
      authToken
      clientMutationId
      user {
        id
        username
        name
        email
        jwtAuthToken
        jwtRefreshToken
      }
    }
  }
`;


export default REGISTER;