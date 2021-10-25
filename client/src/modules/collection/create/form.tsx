import React, { useContext, useState } from "react";

import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Grid,
  Typography,
} from "@mui/material";

import { Collection } from ".prisma/client";

import { useApi } from "../../../hooks/useApi";

import { FullWidthGridItemInput } from "../../common/input/full-width-grid-item-input";
import { GamesFormBody } from "../../game/games-form-body";

import { GamesStateContext } from "../../../contexts/upsert-games-state-context";
import { ActionButtons } from "../../common/button/action-buttons";

import { validateCreateCollectionForm, CreateCollectionValidationFormModel } from "./validator";

export interface CreateCollectionFormProps {
  onSave: () => void;
  onCancel: () => void;
}

export function CreateCollectionForm(props: CreateCollectionFormProps): React.ReactElement {
  const { onSave, onCancel } = props;
  const { apiPost } = useApi();

  const [name, setName] = useState("");
  const [addGamesFormIsActive, setAddGamesFormIsActive] = useState(false);
  const { games, setGames } = useContext(GamesStateContext);
  // const [ownerIds, setOwnerIds] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<CreateCollectionValidationFormModel>({ name: "" });

  const clearErrorField = (e: React.ChangeEvent) => {
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  const handleSubmit = () => {
    const formValid = validateCreateCollectionForm({ name }, setErrors);

    if (formValid) {
      setIsLoading(true);
      // TODO: Create response type or get from api (create api type project)
      apiPost<{ collection: Collection; }>("/collection/upsert", {
        name,
        games,
        // ownerIds,
      })
        .then(({ data }) => {
          // TODO: Add collection to user in redux
          console.log("data: ", data);

          // TODO: Alert user their group has been created
          if (setGames) {
            setGames([]);
          }

          onSave();
        })
        .catch((error) => {
          // TODO: Better error handling
          console.log("create collection error: ", error);
        })
        .finally(() => setIsLoading(false));
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
