import * as React from "react"

import { Grid } from "@material-ui/core";

import { CollectionDetails } from "./model";
import { CollectionCard } from "./card";


export interface CollectionCardListProps {
  collections: CollectionDetails[];
}

export const CollectionCardList: React.FunctionComponent<CollectionCardListProps> = ({ collections }) => {
  return (
    <Grid container direction="column">
      {collections.map((collection) => {
        return (
          <Grid item>
            <CollectionCard collection={collection} />
          </Grid>
        )
      })
      }
    </Grid>
  )
}