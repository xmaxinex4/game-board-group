import { Login } from "./model";

export const validateLoginForm = (model: Login, setErrors: (errorState: Login) => void): boolean => {
  let formIsValid = true;
  let errors = { email: "", password: "" };

  if (!model.email) {
    errors = { ...errors, email: "Email is required" };
    formIsValid = false;
  } else {
    setErrors({ ...errors, email: "" });
  }

  if (!model.password) {
    errors = { ...errors, password: "Password is required" };
    formIsValid = false;
  } else {
    setErrors({ ...errors, password: "" });
  }

  setErrors({ ...errors });
  return formIsValid;
}