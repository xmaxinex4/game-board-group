import React, { useCallback, useContext, useState } from "react";

import PersonIcon from "@mui/icons-material/Person";

import {
  Box,
  Grid,
  Typography,
} from "@mui/material";

import { CollectionResponse, UserResponse } from "../../../../../src/types/types";

import { GamesStateContext } from "../../../contexts/upsert-games-state-context";

import { FullWidthGridItemInput } from "../../common/input/full-width-grid-item-input";
import { GamesFormBody } from "../../game/games-form-body";
import { ActionButtons } from "../../common/button/action-buttons";

import { validateUpsertCollectionForm, UpsertCollectionValidationFormModel } from "./validator";
import { useUpsertCollection } from "./endpoint-hooks";

export interface UpsertCollectionFormProps {
  onSave: () => void;
  onCancel: () => void;
  initialData?: CollectionResponse;
}

export function UpsertCollectionForm(props: UpsertCollectionFormProps): React.ReactElement {
  const { onSave, onCancel, initialData } = props;
  const { upsertCollection } = useUpsertCollection();
  const { games, setGames } = useContext(GamesStateContext);
  const [owners, setOwners] = useState<UserResponse[]>(initialData?.owners || []);

  const [name, setName] = useState(initialData?.name || "");
  const [addGamesFormIsActive, setAddGamesFormIsActive] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<UpsertCollectionValidationFormModel>({ name: "" });

  const clearErrorField = (e: React.ChangeEvent) => {
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  const onCollectionUpserted = useCallback((collection: CollectionResponse) => {
    // TODO: Add collection to user in redux
    console.log("data: ", collection);

    // TODO: Alert user their group has been created
    if (setGames) {
      setGames([]);
    }

    if (setOwners) {
      setOwners([]);
    }

    onSave();
  }, [setGames, onSave]);

  const handleSubmit = () => {
    const formValid = validateUpsertCollectionForm({ name }, setErrors);

    if (formValid) {
      upsertCollection({
        collectionId: initialData?.id,
        collectionName: name,
        collectionGames: games,
        collectionOwners: owners,
        onCollectionUpserted,
        setIsLoading,
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form noValidate onSubmit={handleFormSubmit}>
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
            inputProps={{ maxLength: 50 }}
            outlinedInputProps={{ id: "name" }}
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
            minHeight: "250px",
          }}
          >
            <GamesFormBody isActive={addGamesFormIsActive} setIsActive={setAddGamesFormIsActive} />
          </Box>
        </Grid>

        <Grid item>
          Aggregate users from active user&apos;s membership groups into a multi select input
        </Grid>

        <Grid item>
          <ActionButtons
            formButtons
            onSave={handleSubmit}
            saveText="Create Collection"
            onCancel={onCancel}
            disabled={isLoading}
          />
        </Grid>
      </Grid>
    </form>
  );
}
