/* eslint-disable no-unused-vars */

import { EditAccountFormModel } from "./model";

export function validateEditAccountForm(
  model: EditAccountFormModel,
  setErrors: (errorState: Omit<EditAccountFormModel, "color"> & { color: string; }) => void,
): boolean {
  let formIsValid = true;
  let errors: Omit<EditAccountFormModel, "color"> & { color: string; } = {
    username: "",
    color: "",
  };

  if (!model.username) {
    errors = { ...errors, username: "Username is required" };
    formIsValid = false;
  }

  if (model.username.length > 25) {
    errors = { ...errors, username: "Username must be less then 25 characters" };
    formIsValid = false;
  }

  if (!model.color) {
    errors = { ...errors, color: "Color is required" };
    formIsValid = false;
  }

  setErrors({ ...errors });
  return formIsValid;
}
