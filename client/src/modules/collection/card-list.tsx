/* eslint-disable no-unused-vars */

import React from "react";

import { Grid } from "@mui/material";

import { CollectionResponse } from "../../../../src/types/types";

import { CollectionCard } from "./card";

export interface CollectionCardListProps {
  collections: CollectionResponse[];
  onCollectionCardEdit: (collection: CollectionResponse) => void;
}

export function CollectionCardList(props: CollectionCardListProps): React.ReactElement {
  const { collections, onCollectionCardEdit } = props;

  return (
    <Grid container direction="column" spacing={2}>
      {collections.map((collection) => (
        <Grid key={`collection-card-collection-id-${collection.id}`} item>
          <CollectionCard onEdit={onCollectionCardEdit} collection={collection} />
        </Grid>
      ))}
    </Grid>
  );
}
