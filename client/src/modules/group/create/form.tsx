import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import { Group } from ".prisma/client";

import { FullWidthGridItemInput } from "../../common/input/full-width-grid-item-input";
import { useApi } from "../../../hooks/useApi";

import { CreateGroupFormModel } from "./model";
import { validateCreateGroupForm } from "./validator";
import { addUserGroup, setActiveGroupId } from "../redux/slice";

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
      // TODO: Create create response type or get from api (create api type project)
      apiPost<{ group: Group; }>("/group/create", {
        name,
      })
        .then(({ data }) => {
          // TODO: Alert user their group has been created
          console.log("created group: ", data?.group);

          dispatch(addUserGroup({
            group: data?.group,
          }));

          dispatch(setActiveGroupId({
            id: data?.group?.id,
          }));
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
      <Grid container direction="column" spacing={4}>
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

        <Grid container item alignItems="stretch">
          <Button fullWidth variant="contained" color="primary" disabled={isLoading} type="submit">Create Group</Button>
        </Grid>
      </Grid>
    </form>
  );
}
