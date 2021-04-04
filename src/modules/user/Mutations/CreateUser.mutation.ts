import gql from "graphql-tag";

export const CREATE_USER = gql`
mutation CREATE_USER(
  $email: String!
  $username: String!,
  $color: String!,
  $password: String!) {
    createUser(
        email: $email
        username: $username
        color: $color
        password: $password
    )
  {
    token,
    user {
      email
    }
  }
}
`