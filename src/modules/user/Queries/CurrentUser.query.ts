import gql from "graphql-tag";

export const CURRENT_USER = gql`
  query {
    me {
        id
        username
        color
        email
        groupMemberships {
          group {
            id
            name
          }
        }
      }
    }
`;