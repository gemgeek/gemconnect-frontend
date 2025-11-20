import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      user {
        id
        username
        email
      }
      # If your backend returns a token here, uncomment the next line
      # token 
    }
  }
`;

export const LOGIN_USER = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      # payload  <-- You can ask for payload if you want, but NOT user
    }
  }
`;