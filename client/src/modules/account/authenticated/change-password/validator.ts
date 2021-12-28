/* eslint-disable no-unused-vars */

import { ChangePasswordFormModel } from "./model";

export function validateChangePasswordForm(
  model: ChangePasswordFormModel,
  setErrors: (errorState: ChangePasswordFormModel) => void,
): boolean {
  let formIsValid = true;
  let errors: ChangePasswordFormModel = {
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
