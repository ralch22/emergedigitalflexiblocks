import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation LOGIN($input: LoginInput!) {
    login(input: $input) {
      authToken
      refreshToken
      user {
        id
        jwtAuthExpiration
        name
        email
      }
    }
  }
`;

export default LOGIN;
