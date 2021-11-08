import React, { useState } from "react";
import { useHistory } from "react-router";

import { Button, Grid } from "@mui/material";

import { FullWidthGridItemInput } from "../../common/input/full-width-grid-item-input";

import { CreateGroupFormModel } from "./model";
import { validateCreateGroupForm } from "./validator";
import { useCreateGroup } from "./endpoint-hooks";

export function CreateGroupForm(): React.ReactElement {
  const { createGroup } = useCreateGroup();
  const history = useHistory();

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<CreateGroupFormModel>({ name: "" });

  const clearErrorField = (e: React.ChangeEvent) => {
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formValid = validateCreateGroupForm({ name }, setErrors);

    if (formValid) {
      createGroup({
        name,
        onGroupCreated: () => {
          history.push("/manage-group");
        },
        setIsLoading,
      });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} autoComplete="off">
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
          formControlProps={{ required: true, disabled: isLoading, fullWidth: true }}
          input={name}
          inputProps={{ maxLength: 50 }}
          outlinedInputProps={{ id: "name" }}
          inputLabel="Name"
          setInputState={setName}
          error={errors.name}
          onInputChange={clearErrorField}
        />

        <Grid container item>
          <Button
            variant="contained"
            color="primary"
            disabled={isLoading}
            type="submit"
            sx={{
              marginLeft: "auto",
              width: {
                xs: "100%",
                md: "unset",
              },
            }}
          >
            Create Group
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
