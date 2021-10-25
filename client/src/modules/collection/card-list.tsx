import React from "react";

import { Grid } from "@mui/material";

import { CollectionCard } from "./card";
import { CollectionResponse } from "../../types";

export interface CollectionCardListProps {
  collections: CollectionResponse[];
}

export function CollectionCardList(props: CollectionCardListProps): React.ReactElement {
  const { collections } = props;

  return (
    <Grid container direction="column" spacing={2}>
      {collections.map((collection) => (
        <Grid key={`collection-card-collection-id-${collection.id}`} item>
          <CollectionCard collection={collection} />
        </Grid>
      ))}
    </Grid>
  );
}
