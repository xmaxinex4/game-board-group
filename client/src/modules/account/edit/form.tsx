import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Button,
  Grid,
  InputLabel,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

import { MeeplePaletteColorTheme } from "../../../theme/meeple-palettes";
import { useApi } from "../../../hooks/useApi";
import { ActiveUserResponse } from "../../../types";

import { FullWidthGridItemInput } from "../../common/input/full-width-grid-item-input";
import { MeepleColorPicker } from "../../common/meeple-color-picker";

import { EditAccountFormModel } from "./model";
import { validateEditAccountForm } from "./validator";
import { setActiveUser } from "../../../redux/active-user-slice";

export interface EditAccountFormProps {
  initialData: EditAccountFormModel;
  onSave: () => void;
  onCancel: () => void;
}

export function EditAccountForm(props: EditAccountFormProps): React.ReactElement {
  const { initialData, onSave, onCancel } = props;

  const dispatch = useDispatch();

  const [username, setUsername] = useState(initialData.username);
  const [color, setColor] = useState<keyof MeeplePaletteColorTheme>(initialData.color);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Omit<EditAccountFormModel, "color"> & { color: string; }>({
    username: "",
    color: "",
  });

  const clearErrorField = (e: React.ChangeEvent) => {
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  const { apiPost } = useApi();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isFormValid = validateEditAccountForm({
      username,
      color,
    }, setErrors);

    if (isFormValid) {
      setIsLoading(true);
      apiPost<ActiveUserResponse>("/account/edit", {
        color,
        username,
      })
        .then(({ data }) => {
          dispatch(setActiveUser({ user: data }));
          onSave();
        })
        .catch((error) => {
          // TODO: Better error handling
          console.log("login error: ", error);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={8}>
        <Grid container item direction="column" spacing={4}>
          <FullWidthGridItemInput
            formControlProps={{ required: true, disabled: isLoading, fullWidth: true }}
            outerEndAdornmentIcon={PersonIcon}
            input={username}
            inputProps={{ id: "username" }}
            inputLabel="Username"
            setInputState={setUsername}
            error={errors.username}
            onInputChange={clearErrorField}
          />

          <Grid container item direction="column" spacing={2}>
            <Grid item>
              <InputLabel required>Color</InputLabel>
            </Grid>
            <Grid item>
              <MeepleColorPicker color={color} setColor={setColor} />
            </Grid>
          </Grid>

          <Grid item sx={{ marginLeft: { md: "auto" }, marginTop: "8px" }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" color="primary" disabled={isLoading} onClick={onCancel}>Cancel</Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" color="primary" disabled={isLoading} type="submit">Save</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
