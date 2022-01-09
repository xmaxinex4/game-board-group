/* eslint-disable no-unused-vars, max-len */

import { LoginFormModel } from "./model";

function validateEmail(email: string) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

export function validateLoginForm(model: LoginFormModel, setErrors: (errorState: LoginFormModel) => void): boolean {
  let formIsValid = true;
  let errors = { email: "", password: "" };

  if (!model.email) {
    errors = { ...errors, email: "Email is required" };
    formIsValid = false;
  }

  if (model.email && !validateEmail(model.email)) {
    errors = { ...errors, email: "Invalid Email Address" };
    formIsValid = false;
  }

  if (!model.password) {
    errors = { ...errors, password: "Password is required" };
    formIsValid = false;
  }

  setErrors({ ...errors });
  return formIsValid;
}
