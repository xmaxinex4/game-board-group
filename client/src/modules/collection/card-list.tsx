import React from "react";

import { Grid } from "@mui/material";

import { Collection, Game } from ".prisma/client";

import { CollectionCard } from "./card";

export interface CollectionCardListProps {
  collections: (Pick<Collection, "name" | "id"> & { games: Game[]; })[];
}

export function CollectionCardList(props: CollectionCardListProps): React.ReactElement {
  const { collections } = props;

  return (
    <Grid container direction="column">
      {collections.map((collection) => (
        <Grid key={`collection-card-collection-id-${collection.id}`} item>
          <CollectionCard collection={collection} />
        </Grid>
      ))}
    </Grid>
  );
}
