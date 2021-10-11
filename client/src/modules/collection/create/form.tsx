import React, { useCallback, useState } from "react";

import { Button, Grid, Typography } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

import { useApi } from "../../../hooks/useApi";
import { FullWidthGridItemInput } from "../../common/input/full-width-grid-item-input";
import { CreateCollectionFormModel } from "./model";
import { validateCreateCollectionForm } from "./validator";
import { Collection } from "../../../api-types/collection";
import { AddGamesModal } from "../../game/add-games-modal";
import { Game } from "../../../api-types/game";

export function CreateCollectionForm(): React.ReactElement {
  const { apiPost } = useApi();

  const [name, setName] = useState("");
  // const [ownerIds, setOwnerIds] = useState<string[]>([]);
  const [games, setGames] = React.useState<Game[]>([]);

  const [showAddGamesModal, setShowAddGamesModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<CreateCollectionFormModel>({ name: "", ownerIds: [], gameIds: [] });

  const clearErrorField = (e: React.ChangeEvent) => {
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  const openAddGamesModal = useCallback(() => setShowAddGamesModal(true), [setShowAddGamesModal]);
  const closeAddGamesModal = useCallback(() => setShowAddGamesModal(false), [setShowAddGamesModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const gameIds = games.map((game) => game.bggId);

    const formValid = validateCreateCollectionForm({ name, gameIds, ownerIds: [] }, setErrors);

    if (formValid) {
      setIsLoading(true);
      // TODO: Create create response type or get from api (create api type project)
      apiPost<{ collection: Collection; }>("/group/create", {
        name,
        gameIds,
        // ownerIds,
      })
        .then(({ data }) => {
          // TODO: Alert user their group has been created
          console.log("created group: ", data?.collection);
        })
        .catch((error) => {
          // TODO: Better error handling
          console.log("create collection error: ", error);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
        <Grid item>
          <Typography variant="h5" component="h2">
            Create Collection
          </Typography>
        </Grid>

        <FullWidthGridItemInput
          formControlProps={{ required: true, disabled: isLoading, fullWidth: true }}
          outerEndAdornmentIcon={PersonIcon}
          input={name}
          inputProps={{ id: "name" }}
          inputLabel="Name"
          setInputState={setName}
          error={errors.name}
          onInputChange={clearErrorField}
        />

        <Button onClick={openAddGamesModal}>+ Game</Button>
        <AddGamesModal closeModal={closeAddGamesModal} open={showAddGamesModal} setGames={setGames} games={games} />
        {/* <AddOwnersModal closeModal={closeAddGamesModal} open={showAddGamesModal} setGameIds={setGameIds} /> */}

        <Grid container item alignItems="stretch">
          <Button fullWidth variant="contained" color="primary" disabled={isLoading} type="submit">Create Collection</Button>
        </Grid>
      </Grid>
    </form>
  );
}
