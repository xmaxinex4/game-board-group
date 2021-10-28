/* eslint-disable no-unused-vars */

import React from "react";
import { useSelector } from "react-redux";

import { Grid } from "@mui/material";

import { CollectionResponse } from "../../../../src/types/types";
import { selectActiveUserCollections } from "../../redux/active-user-collections-slice";

import { CollectionCard } from "./card";

export interface CollectionCardListProps {
  onCollectionCardEdit: (collection: CollectionResponse) => void;
}

export function CollectionCardList(props: CollectionCardListProps): React.ReactElement {
  const { onCollectionCardEdit } = props;
  const userCollections = useSelector(selectActiveUserCollections);

  return (
    <Grid container direction="column" spacing={2}>
      {userCollections?.collections?.map((collection) => (
        <Grid key={`collection-card-collection-id-${collection.id}`} item>
          <CollectionCard onEdit={onCollectionCardEdit} collection={collection} />
        </Grid>
      ))}
    </Grid>
  );
}
