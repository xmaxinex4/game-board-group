import React, { useCallback, useState } from "react";

import { makeStyles } from "@mui/styles";
import { Button, Grid, Typography } from "@mui/material";

import { Game } from ".prisma/client";

import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { CreateCollectionForm } from "../../modules/collection/create/form";
import { GamesStateContext } from "../../contexts/games-state-context";

const useStyles = makeStyles(() => ({
  createFormContainer: {
    width: "100%",
    maxWidth: "500px",
  },
}));

export function MyCollections(): React.ReactElement {
  const [showAddCollectionForm, setshowAddCollectionForm] = useState(false);
  const [games, setGames] = useState<Pick<Game, "bggId" | "name" | "urlThumb" | "urlImage">[]>([]);
  const { createFormContainer } = useStyles();

  const showForm = useCallback(() => setshowAddCollectionForm(true), [setshowAddCollectionForm]);

  return (
    <TabContentContainer subTitle="My Game Collections">
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
        {showAddCollectionForm ? (
          <Grid item className={createFormContainer}>
            <GamesStateContext.Provider value={{ games, setGames }}>
              <CreateCollectionForm />
            </GamesStateContext.Provider>
          </Grid>
        ) : (
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
        )}
      </Grid>
    </TabContentContainer>
  );
}
