/* eslint-disable no-unused-vars, max-len */

import { CreateUserFormModel } from "./model";

function validateEmail(email: string) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

function validatePassword(password: string) {
  const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  return regex.test(String(password));
}

export function validateCreateUserForm(
  model: CreateUserFormModel,
  setErrors: (errorState: Omit<CreateUserFormModel, "color"> & { color: string; }) => void,
): boolean {
  let formIsValid = true;
  let errors: Omit<CreateUserFormModel, "color"> & { color: string; } = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    color: "",
  };

  if (!model.email) {
    errors = { ...errors, email: "Email is required" };
    formIsValid = false;
  }

  if (model.email && !validateEmail(model.email)) {
    errors = { ...errors, email: "Invalid Email Address" };
    formIsValid = false;
  }

  if (!model.username) {
    errors = { ...errors, username: "Username is required" };
    formIsValid = false;
  }

  if (model.username.length > 25) {
    errors = { ...errors, username: "Username must be less then 25 characters" };
    formIsValid = false;
  }

  if (!model.password) {
    errors = { ...errors, password: "Password is required" };
    formIsValid = false;
  }

  if (model.password && !validatePassword(model.password)) {
    errors = {
      ...errors,
      password:
        "Password must contain lowercase, uppercase, and numeric. Password must be at least 8 characters long",
    };
    formIsValid = false;
  }

  if (model.password !== model.confirmPassword) {
    errors = { ...errors, confirmPassword: "Passwords do not match" };
    formIsValid = false;
  }

  if (!model.confirmPassword) {
    errors = { ...errors, confirmPassword: "Please confirm your password" };
    formIsValid = false;
  }

  if (!model.color) {
    errors = { ...errors, color: "Color is required" };
    formIsValid = false;
  }

  setErrors({ ...errors });
  return formIsValid;
}
