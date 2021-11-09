/* eslint-disable no-unused-vars */

import { EditGroupFormModel } from "./model";

export const validateEditGroupForm = (model: EditGroupFormModel, setErrors: (errorState: EditGroupFormModel) => void): boolean => {
  let formIsValid = true;
  let errors: EditGroupFormModel = { name: "" };

  if (!model.name) {
    errors = { ...errors, name: "Name is required" };
    formIsValid = false;
  }

  // TODO: Probably need more validation?

  setErrors({ ...errors });
  return formIsValid;
};
