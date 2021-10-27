import React, { useState } from "react";

import { Grid } from "@mui/material";

import { useApi } from "../../../hooks/useApi";

import { ActiveUserResponse } from "../../../../../src/types/types";

import { FullWidthGridItemPasswordInput } from "../../common/input/full-width-grid-item-password-input";
import { ActionButtons } from "../../common/button/action-buttons";

import { ChangePasswordFormModel } from "./model";
import { validateChangePasswordForm } from "./validator";

export interface ChangePasswordFormProps {
  onSave: () => void;
  onCancel: () => void;
}

export function ChangePasswordForm(props: ChangePasswordFormProps): React.ReactElement {
  const { onSave, onCancel } = props;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ChangePasswordFormModel>({
    currentPassword: "",
    confirmNewPassword: "",
    newPassword: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const showPasswordOverrideControl = {
    showPassword,
    setShowPassword,
  };

  const clearErrorField = (e: React.ChangeEvent) => {
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  const { apiPost } = useApi();

  const handleSubmit = () => {
    const isFormValid = validateChangePasswordForm({
      currentPassword,
      newPassword,
      confirmNewPassword,
    }, setErrors);

    if (isFormValid) {
      setIsLoading(true);
      // TODO: Create create response type or get from api (create api type project)
      apiPost<ActiveUserResponse>("/account/change-password", {
        currentPassword,
        newPassword,
      })
        .then(() => {
          // TODO: Success
          onSave();
        })
        .catch((error) => {
          // TODO: Better error handling
          console.log("login error: ", error);
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
      <Grid container direction="column" spacing={8}>
        <Grid container item direction="column" spacing={4}>
          <FullWidthGridItemPasswordInput
            formControlProps={{ required: true, disabled: isLoading, fullWidth: true }}
            input={currentPassword}
            fullWidthGridItemInputId="currentPassword"
            inputLabel="Current Password"
            setInputState={setCurrentPassword}
            error={errors.currentPassword}
            onInputChange={clearErrorField}
            showPasswordOverrideControl={showPasswordOverrideControl}
          />

          <FullWidthGridItemPasswordInput
            formControlProps={{ required: true, disabled: isLoading, fullWidth: true }}
            input={newPassword}
            fullWidthGridItemInputId="newPassword"
            inputLabel="New Password"
            setInputState={setNewPassword}
            error={errors.newPassword}
            onInputChange={clearErrorField}
            showPasswordOverrideControl={showPasswordOverrideControl}
          />

          <FullWidthGridItemPasswordInput
            formControlProps={{ required: true, disabled: isLoading, fullWidth: true }}
            input={confirmNewPassword}
            fullWidthGridItemInputId="confirmNewPassword"
            inputLabel="Confirm New Password"
            setInputState={setConfirmNewPassword}
            error={errors.confirmNewPassword}
            onInputChange={clearErrorField}
            showPasswordOverrideControl={showPasswordOverrideControl}
          />

          <Grid item>
            <ActionButtons
              formButtons
              onSave={handleSubmit}
              onCancel={onCancel}
              disabled={isLoading}
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}