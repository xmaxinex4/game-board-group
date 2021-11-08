import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import GameIcon from "@mui/icons-material/CasinoTwoTone";
import RefreshIcon from "@mui/icons-material/RefreshTwoTone";

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
  GameResponse,
} from "../../../../src/types/types";

import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { UpsertCollectionForm } from "../../modules/collection/upsert/form";
import { GamesStateContext } from "../../contexts/upsert-games-state-context";
import { CollectionCardList } from "../../modules/collection/card-list";
import { selectActiveUserCollections } from "../../redux/active-user-collections-slice";
import { selectActiveUser } from "../../redux/active-user-slice";
import { useRefreshCollections } from "../../modules/collection/refresh/endpoint-hooks";

export function MyCollections(): React.ReactElement {
  const [loadingCollections, setLoadingCollections] = useState(true);
  const [refreshingCollections, setRefreshingCollections] = useState(false);

  const [initialCollectionData, setInitialDataCollection] = useState<Partial<CollectionResponse>>();
  const [showUpsertCollectionForm, setShowUpsertCollectionForm] = useState(false);
  const [formGames, setFormGames] = useState<GameResponse[]>([]);

  const userCollections = useSelector(selectActiveUserCollections);
  const activeUser = useSelector(selectActiveUser);
  const { refreshAllCollections } = useRefreshCollections();

  const showForm = useCallback(() => setShowUpsertCollectionForm(true), [setShowUpsertCollectionForm]);
  const hideForm = useCallback(() => setShowUpsertCollectionForm(false), [setShowUpsertCollectionForm]);

  const refreshCollections = useCallback(() => {
    refreshAllCollections({
      setIsLoading: setRefreshingCollections,
    });
  }, [setRefreshingCollections]);

  const getCollections = useCallback(() => {
    refreshAllCollections({
      setIsLoading: setLoadingCollections,
    });
  }, [setLoadingCollections]);

  // run once on page load
  useEffect(() => {
    getCollections();
  }, []);

  const onAddCollection = useCallback(() => {
    setInitialDataCollection({ owners: activeUser ? [activeUser] : [] });
    showForm();
  }, [setInitialDataCollection, activeUser, showForm]);

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
            <Grid container justifyContent="center" alignItems="center">
              <CircularProgress size={72} sx={{ padding: "100px" }} />
            </Grid>
          )
          : (
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
              {showUpsertCollectionForm && (
                <Grid item sx={{ width: "100%" }}>
                  <Card sx={{ margin: "auto", maxWidth: "600px", minWidth: "275px" }}>
                    <CardContent>
                      <GamesStateContext.Provider value={{ games: formGames, setGames: setFormGames }}>
                        <UpsertCollectionForm initialData={initialCollectionData} onSave={hideForm} onCancel={onCollectionUpsertCancel} />
                      </GamesStateContext.Provider>
                    </CardContent>
                  </Card>
                </Grid>
              )}
              {!showUpsertCollectionForm && (
                userCollections?.collections?.length > 0
                  ? (
                    <Grid item sx={{ width: "100%" }}>
                      <Grid container direction="column" spacing={4}>
                        <Grid item sx={{ marginLeft: "auto" }}>
                          <Button
                            variant="text"
                            color="primary"
                            size="small"
                            startIcon={<RefreshIcon />}
                            disabled={refreshingCollections}
                            onClick={refreshCollections}
                            aria-label="Refresh All Collections"
                          >
                            Refresh
                          </Button>
                        </Grid>
                        <Grid item>
                          {refreshingCollections
                            ? (
                              <Grid container justifyContent="center" alignItems="center">
                                <CircularProgress size={72} sx={{ padding: "100px" }} />
                              </Grid>
                            )
                            : (
                              <Grid container sx={{ margin: "auto", maxWidth: "800px", minWidth: "275px" }}>
                                <CollectionCardList onEdit={onCollectionCardEdit} />
                              </Grid>
                            )}
                        </Grid>
                      </Grid>
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
                        <Button onClick={onAddCollection} variant="outlined">+ Add Collection</Button>
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
