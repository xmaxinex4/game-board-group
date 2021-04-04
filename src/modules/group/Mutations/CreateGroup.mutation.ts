import gql from "graphql-tag";

export const CREATE_GROUP = gql`
mutation CREATE_GROUP(
  $name: String!) {
    createGroup(
        name: $name
    )
  {
    name,
    members {
      user {
        id
        username
      }
    }
  }
}
`