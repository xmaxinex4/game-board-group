import React, { useState } from "react";
import { useHistory } from "react-router";

import ArrowForwardIcon from "@mui/icons-material/ArrowForwardTwoTone";

import { Button, Grid, Typography } from "@mui/material";

import { FullWidthGridItemInput } from "../../common/input/full-width-grid-item-input";

import { CreateGroupFormModel } from "./model";
import { validateCreateGroupForm } from "./validator";
import { useCreateGroup } from "./endpoint-hooks";
import { ErrorDisplay } from "../../common/error/error-display";

export function CreateGroupForm(): React.ReactElement {
  const { createGroup } = useCreateGroup();
  const history = useHistory();

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<CreateGroupFormModel>({ name: "" });
  const [serverError, setServerError] = useState("");

  const clearErrorField = (e: React.ChangeEvent) => {
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  const goToManageGroups = () => history.push("/manage-group");

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
        onError: (error) => {
          if (error) {
            setServerError(error || "Something went wrong. Please try again.");
          }

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        },
      });
    }
  };

  return (
    <>
      {serverError && (
        <ErrorDisplay
          error={
            serverError === "Users are limited to 2 groups"
              ? (
                <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                  <Grid item>
                    <Typography>
                      You may only own two groups at a time.
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button endIcon={<ArrowForwardIcon />} onClick={goToManageGroups} variant="outlined">
                      Manage Current Groups
                    </Button>
                  </Grid>
                </Grid>
              )
              : undefined
          }
        />
      )}
      {!serverError && (
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
      )}
    </>
  );
}
