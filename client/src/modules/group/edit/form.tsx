import React, { useState } from "react";

import { Grid } from "@mui/material";

import { GroupResponse } from "../../../../../src/types/types";
import { FullWidthGridItemInput } from "../../common/input/full-width-grid-item-input";

import { EditGroupFormModel } from "./model";
import { validateEditGroupForm } from "./validator";
import { useEditActiveGroup } from "./endpoint-hooks";
import { ActionButtons } from "../../common/button/action-buttons";

export interface EditGroupFormProps {
  onActiveGroupEdited: () => void;
  intialData: Pick<GroupResponse, "id" | "name">;
  onCancel: () => void;
}

export function EditGroupForm(props: EditGroupFormProps): React.ReactElement {
  const { onActiveGroupEdited, intialData, onCancel } = props;

  const { editActiveGroup } = useEditActiveGroup();

  const [name, setName] = useState(intialData.name);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<EditGroupFormModel>({ name: "" });

  const clearErrorField = (e: React.ChangeEvent) => {
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  const handleSubmit = () => {
    const formValid = validateEditGroupForm({ name }, setErrors);

    if (formValid) {
      editActiveGroup({
        name,
        onActiveGroupEdited: () => {
          onActiveGroupEdited();
        },
        setIsLoading: setIsSaving,
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form noValidate onSubmit={handleFormSubmit} autoComplete="off">
      <Grid
        container
        direction="column"
        spacing={4}
        sx={{
          minWidth: {
            xs: "300px",
            sm: "400px",
            md: "500px",
          },
        }}
      >
        <FullWidthGridItemInput
          formControlProps={{ required: true, disabled: isSaving, fullWidth: true }}
          input={name}
          inputProps={{ maxLength: 50 }}
          outlinedInputProps={{ id: "name" }}
          inputLabel="Name"
          setInputState={setName}
          error={errors.name}
          onInputChange={clearErrorField}
        />

        <Grid container item>
          <ActionButtons
            formButtons
            onSave={handleSubmit}
            onCancel={onCancel}
            disabled={isSaving}
          />
        </Grid>
      </Grid>
    </form>
  );
}
