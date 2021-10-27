import React, { useCallback, useEffect, useState } from "react";

import GameIcon from "@mui/icons-material/CasinoTwoTone";

import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import {
  CollectionResponse,
  CollectionsResponse,
  GameResponse,
} from "../../../../src/types/types";

import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { UpsertCollectionForm } from "../../modules/collection/upsert/form";
import { GamesStateContext } from "../../contexts/upsert-games-state-context";
import { useApi } from "../../hooks/useApi";
import { CollectionCardList } from "../../modules/collection/card-list";

export function MyCollections(): React.ReactElement {
  const [userCollections, setUserCollections] = useState<CollectionResponse[]>([]);
  const [loadingCollections, setLoadingCollections] = useState(false);

  const [initialCollectionData, setInitialDataCollection] = useState<CollectionResponse>();
  const [showUpsertCollectionForm, setShowUpsertCollectionForm] = useState(false);
  const [formGames, setFormGames] = useState<GameResponse[]>([]);

  const { apiGet } = useApi();
  const showForm = useCallback(() => setShowUpsertCollectionForm(true), [setShowUpsertCollectionForm]);
  const hideForm = useCallback(() => setShowUpsertCollectionForm(false), [setShowUpsertCollectionForm]);

  const getCollections = useCallback(() => {
    setLoadingCollections(true);
    apiGet<CollectionsResponse>("/collection/mycollections")
      .then(({ data }) => setUserCollections(data.collections))
      .finally(() => setLoadingCollections(false));
  }, [setLoadingCollections]);

  // run once on page load
  useEffect(() => {
    getCollections();
  }, []);

  const onCollectionCardEdit = useCallback((collection: CollectionResponse) => {
    setInitialDataCollection(collection);
    setFormGames(collection.games);
    showForm();
  }, [setFormGames, setShowUpsertCollectionForm]);

  const onCollectionUpsertCancel = useCallback(() => {
    setInitialDataCollection(undefined);
    setFormGames([]);
    hideForm();
  }, [setInitialDataCollection, setFormGames, hideForm]);

  return (
    <TabContentContainer title={showUpsertCollectionForm ? "" : "My Game Collections"}>
      {
        loadingCollections
          ? (
            <CircularProgress />
          )
          : (
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
              {showUpsertCollectionForm && (
                <Grid item sx={{ width: "100%" }}>
                  <Card sx={{ margin: "auto", maxWidth: "600px", minWidth: "275px" }}>
                    <CardContent>
                      <GamesStateContext.Provider value={{ games: formGames, setGames: setFormGames }}>
                        <UpsertCollectionForm initialData={initialCollectionData} onSave={showForm} onCancel={onCollectionUpsertCancel} />
                      </GamesStateContext.Provider>
                    </CardContent>
                  </Card>
                </Grid>
              )}
              {!showUpsertCollectionForm && (
                userCollections?.length > 0
                  ? (
                    <Grid item>
                      <CollectionCardList onCollectionCardEdit={onCollectionCardEdit} collections={userCollections} />
                    </Grid>
                  )
                  : (
                    <>
                      <Grid item>
                        <GameIcon fontSize="large" color="primary" />
                      </Grid>
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
          )
      }
    </TabContentContainer>
  );
}
