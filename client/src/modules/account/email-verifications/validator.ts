/* eslint-disable no-unused-vars, max-len */

function validateEmail(email: string) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

export function validateSendEmailVerificationForm(
  email: string,
  setErrors: (errorState: { email: string; }) => void,
): boolean {
  let formIsValid = true;
  let errors: { email: string; } = {
    email: "",
  };

  if (!email) {
    errors = { ...errors, email: "Email is required" };
    formIsValid = false;
  }

  if (email && !validateEmail(email)) {
    errors = { ...errors, email: "Invalid Email Address" };
    formIsValid = false;
  }

  setErrors({ ...errors });
  return formIsValid;
}
