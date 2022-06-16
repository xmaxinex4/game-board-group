/* eslint-disable no-unused-vars, max-len */

function isPasswordValid(password: string) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  return regex.test(String(password));
}

export function validatePassword(
  password: string,
  confirmPassword: string,
  setErrors: (errorState: { password: string, confirmPassword: string; }) => void,
): boolean {
  let formIsValid = true;
  let errors: { password: string, confirmPassword: string; } = {
    password: "",
    confirmPassword: "",
  };

  if (!password) {
    errors = { ...errors, password: "Password is required" };
    formIsValid = false;
  }

  if (password && !isPasswordValid(password)) {
    errors = {
      ...errors,
      password:
        "Password must contain lowercase, uppercase, and numeric. Password must be at least 8 characters long",
    };
    formIsValid = false;
  }

  if (password !== confirmPassword) {
    errors = { ...errors, confirmPassword: "Passwords do not match" };
    formIsValid = false;
  }

  if (!confirmPassword) {
    errors = { ...errors, confirmPassword: "Please confirm your password" };
    formIsValid = false;
  }

  setErrors({ ...errors });
  return formIsValid;
}
