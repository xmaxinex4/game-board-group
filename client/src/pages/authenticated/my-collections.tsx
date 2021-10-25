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

import { Game } from ".prisma/client";

import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { CreateCollectionForm } from "../../modules/collection/create/form";
import { GamesStateContext } from "../../contexts/upsert-games-state-context";
import { useApi } from "../../hooks/useApi";
import { CollectionCardList } from "../../modules/collection/card-list";
import { CollectionResponse, CollectionsResponse } from "../../types";

export function MyCollections(): React.ReactElement {
  const [userCollections, setUserCollections] = useState<CollectionResponse[]>([]);
  const [loadingCollections, setLoadingCollections] = useState(false);

  const [showAddCollectionForm, setshowAddCollectionForm] = useState(false);
  const [formGames, setFormGames] = useState<Pick<Game, "bggId" | "name" | "urlThumb" | "urlImage" | "year">[]>([]);

  const { apiGet } = useApi();
  const showForm = useCallback(() => setshowAddCollectionForm(true), [setshowAddCollectionForm]);
  const hideForm = useCallback(() => setshowAddCollectionForm(false), [setshowAddCollectionForm]);

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

  return (
    <TabContentContainer title={showAddCollectionForm ? "" : "My Game Collections"}>
      {
        loadingCollections
          ? (
            <CircularProgress />
          )
          : (
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
              {showAddCollectionForm && (
                <Grid item sx={{ width: "100%" }}>
                  <Card sx={{ margin: "auto", maxWidth: "600px", minWidth: "275px" }}>
                    <CardContent>
                      <GamesStateContext.Provider value={{ games: formGames, setGames: setFormGames }}>
                        <CreateCollectionForm onSave={showForm} onCancel={hideForm} />
                      </GamesStateContext.Provider>
                    </CardContent>
                  </Card>
                </Grid>
              )}
              {!showAddCollectionForm && (
                userCollections?.length > 0
                  ? (
                    <Grid item>
                      <CollectionCardList collections={userCollections} />
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
