import { CreateUserFormModel } from "../model";

export interface CreateUserErrorFormModel {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  color: string;
}

export const validateCreateUserForm = (model: CreateUserFormModel, setErrors: (errorState: CreateUserErrorFormModel) => void): boolean => {
  let formIsValid = true;
  let errors = { username: "", email: "", password: "", confirmPassword: "", color: "" };

  if (!model.email) {
    errors = { ...errors, email: "Email is required" };
    formIsValid = false;
  }

  if (!model.username) {
    errors = { ...errors, username: "Username is required" };
    formIsValid = false;
  }

  if (!model.password) {
    errors = { ...errors, password: "Password is required" };
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