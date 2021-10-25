import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Grid } from "@mui/material";

import { FullWidthGridItemInput } from "../../common/input/full-width-grid-item-input";
import { useApi } from "../../../hooks/useApi";

import { CreateGroupFormModel } from "./model";
import { validateCreateGroupForm } from "./validator";
import { GroupMembershipResponse } from "../../../types";
import { addActiveUserGroupMembership, setSelectedActiveUserGroupMembershipId } from "../../../redux/active-user-group-memberships-slice";

export function CreateGroupForm(): React.ReactElement {
  const { apiPost } = useApi();
  const dispatch = useDispatch();

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
      setIsLoading(true);
      apiPost<GroupMembershipResponse>("/group/create", {
        name,
      })
        .then(({ data }) => {
          // TODO: Alert user their group has been created
          console.log("created group membership: ", data);

          dispatch(addActiveUserGroupMembership({
            groupMembership: data,
          }));

          dispatch(setSelectedActiveUserGroupMembershipId({
            id: data?.id,
          }));

          window.location.href = "/manage-group";
        })
        .catch((error) => {
          // TODO: Better error handling
          console.log("create group error: ", error);
        })
        .finally(() => setIsLoading(false));
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
