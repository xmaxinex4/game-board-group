import React, { useCallback, useState } from "react";

import {
  Grid,
  InputLabel,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

import { Color } from ".prisma/client";

import { setActiveUser } from "../../../redux/active-user-slice";

import { FullWidthGridItemInput } from "../../common/input/full-width-grid-item-input";
import { MeepleColorPicker } from "../../common/meeple-color-picker";
import { ActionButtons } from "../../common/button/action-buttons";

import { EditAccountFormModel } from "./model";
import { validateEditAccountForm } from "./validator";
import { useEditAccount } from "./endpoint-hooks";

export interface EditAccountFormProps {
  initialData: EditAccountFormModel;
  onSave: () => void;
  onCancel: () => void;
}

export function EditAccountForm(props: EditAccountFormProps): React.ReactElement {
  const { initialData, onSave, onCancel } = props;

  const [username, setUsername] = useState(initialData.username);
  const [color, setColor] = useState<Color>(initialData.color);

  const { editAccount } = useEditAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Omit<EditAccountFormModel, "color"> & { color: string; }>({
    username: "",
    color: "",
  });

  const clearErrorField = (e: React.ChangeEvent) => {
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  const onAccountEdited = useCallback(() => {
    onSave();
  }, [setActiveUser, onSave]);

  const handleSubmit = () => {
    const isFormValid = validateEditAccountForm({
      username,
      color,
    }, setErrors);

    if (isFormValid) {
      editAccount({
        username,
        color,
        setIsLoading,
        onAccountEdited,
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form noValidate onSubmit={handleFormSubmit}>
      <Grid container direction="column" spacing={4}>
        <FullWidthGridItemInput
          formControlProps={{ required: true, disabled: isLoading, fullWidth: true }}
          outerEndAdornmentIcon={PersonIcon}
          input={username}
          inputProps={{ maxLength: 50 }}
          outlinedInputProps={{ id: "username" }}
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

        <Grid item>
          <ActionButtons
            formButtons
            onSave={handleSubmit}
            onCancel={onCancel}
            disabled={isLoading}
          />
        </Grid>
      </Grid>
    </form>
  );
}
