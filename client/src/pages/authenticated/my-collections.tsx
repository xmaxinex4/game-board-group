import React, { useCallback, useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import { Collection, Game } from ".prisma/client";

import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { CreateCollectionForm } from "../../modules/collection/create/form";
import { GamesStateContext } from "../../contexts/upsert-games-state-context";
import { useApi } from "../../hooks/useApi";
import { CollectionCardList } from "../../modules/collection/card-list";

const useStyles = makeStyles(() => ({
  createFormContainer: {
    width: "100%",
    maxWidth: "500px",
  },
}));

export function MyCollections(): React.ReactElement {
  const [userCollections, setUserCollections] = useState<(Pick<Collection, "name" | "id"> & { games: Game[]; })[]>([]);
  const [loadingCollections, setLoadingCollections] = useState(false);

  const [showAddCollectionForm, setshowAddCollectionForm] = useState(false);
  const [formGames, setFormGames] = useState<Pick<Game, "bggId" | "name" | "urlThumb" | "urlImage" | "year">[]>([]);

  const { createFormContainer } = useStyles();

  const { apiGet } = useApi();
  const showForm = useCallback(() => setshowAddCollectionForm(true), [setshowAddCollectionForm]);

  const getCollections = useCallback(() => {
    setLoadingCollections(true);
    apiGet<(Pick<Collection, "name" | "id"> & { games: Game[]; })[]>("/collection/mycollections")
      .then(({ data }) => setUserCollections(data))
      .finally(() => setLoadingCollections(false));
  }, [setLoadingCollections]);

  // run once on page load
  useEffect(() => {
    getCollections();
  }, []);

  console.log("collections: ", userCollections);

  return (
    <TabContentContainer subTitle="My Game Collections">
      {loadingCollections
        ? (
          <CircularProgress />
        )
        : (
          <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
            {showAddCollectionForm && (
              <Grid item className={createFormContainer}>
                <GamesStateContext.Provider value={{ games: formGames, setGames: setFormGames }}>
                  <CreateCollectionForm />
                </GamesStateContext.Provider>
              </Grid>
            )}
            {!showAddCollectionForm && (
              userCollections?.length > 0
                ? (
                  <CollectionCardList collections={userCollections} />
                )
                : (
                  <>
                    <Grid item>
                      <Typography>
                        Add a New Game Collection to Get Started!
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button onClick={showForm} variant="outlined">+ Add Collection</Button>
                    </Grid>
                  </>
                )
            )}
          </Grid>
        )}
    </TabContentContainer>
  );
}
