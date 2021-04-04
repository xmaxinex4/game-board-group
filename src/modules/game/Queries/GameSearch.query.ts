import gql from "graphql-tag";

export const GAME_SEARCH = gql`
query GAME_SEARCH(
  $search: String!,
  $limit: Int!,
  $exact: Boolean) {
    gameSearch(
          search: $search,
          limit: $limit,
          exact: $exact
    )
  {
    name
    bggId
    year
  }
}
`