import { gql } from '@apollo/client'

const LOGIN = gql`
    mutation LOGIN ( $input: LoginInput!) {
        login(input: $input) {
            authToken
            user {
              id
              name
              email
            }
        }
    }
`;

export default LOGIN;