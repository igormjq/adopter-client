import gql from 'graphql-tag';

export const LOG_USER = gql`mutation login($email: String!, $password: String!) {
  login(data: {
    email: $email,
    password: $password
  }) {
    token
    user {
      id
      name
      email
      profileImg
      role {
        name
        displayName
      }
    }
  }
}`