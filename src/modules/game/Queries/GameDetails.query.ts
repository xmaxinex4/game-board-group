import gql from "graphql-tag";

export const GAME_DISPLAY_DETAILS = gql`
query GAME_DISPLAY_DETAILS(
  $bggId: Int!) {
    gameDetails(
      bggId: $bggId
    )
  {
    name
    bggId
    year
    urlThumb
  }
}
`