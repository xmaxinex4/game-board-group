/* eslint-disable no-unused-vars */

import { ResetPasswordFormModel } from "./model";

export function validateResetPasswordForm(
  model: ResetPasswordFormModel,
  setErrors: (errorState: ResetPasswordFormModel) => void,
): boolean {
  let formIsValid = true;
  let errors: ResetPasswordFormModel = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  if (!model.currentPassword) {
    errors = { ...errors, currentPassword: "Current password is required" };
    formIsValid = false;
  }

  if (!model.newPassword) {
    errors = { ...errors, newPassword: "Password is required" };
    formIsValid = false;
  }

  if (model.newPassword !== model.confirmNewPassword) {
    errors = { ...errors, confirmNewPassword: "Passwords do not match" };
    formIsValid = false;
  }

  if (!model.confirmNewPassword) {
    errors = { ...errors, confirmNewPassword: "Please confirm your new password" };
    formIsValid = false;
  }

  setErrors({ ...errors });
  return formIsValid;
}
