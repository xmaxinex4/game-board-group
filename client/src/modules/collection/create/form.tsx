import React, { useContext, useState } from "react";

import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";

import { Collection } from ".prisma/client";

import { useApi } from "../../../hooks/useApi";

import { FullWidthGridItemInput } from "../../common/input/full-width-grid-item-input";
import { AddGamesForm } from "../../game/add-games-form";

import { CreateCollectionFormModel } from "./model";
import { validateCreateCollectionForm } from "./validator";
import { GamesStateContext } from "../../../contexts/games-state-context";

export function CreateCollectionForm(): React.ReactElement {
  const { apiPost } = useApi();

  const [name, setName] = useState("");
  const [addGamesFormIsActive, setAddGamesFormIsActive] = useState(false);
  const { games } = useContext(GamesStateContext);
  // const [ownerIds, setOwnerIds] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<CreateCollectionFormModel>({ name: "", ownerIds: [], gameIds: [] });

  const clearErrorField = (e: React.ChangeEvent) => {
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const gameIds = games?.map((game) => game.bggId) || [];

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
      <Grid container direction="column" justifyContent="center" alignItems="stretch" spacing={4}>
        <Grid item xs={12}>
          <Typography align="center" variant="h5" component="h2">
            Create Collection
          </Typography>
        </Grid>

        <Grid item>
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
        </Grid>

        <Grid item>
          <Box sx={{
            border: addGamesFormIsActive ? 2 : 1,
            borderRadius: "4px",
            borderColor: addGamesFormIsActive ? "primary.main" : "grey.400",
            padding: "24px",
          }}
          >
            <AddGamesForm isActive={addGamesFormIsActive} setIsActive={setAddGamesFormIsActive} />
          </Box>
        </Grid>

        <Grid container item alignItems="stretch">
          <Button fullWidth variant="contained" color="primary" disabled={isLoading} type="submit">Create Collection</Button>
        </Grid>
      </Grid>
    </form>
  );
}
