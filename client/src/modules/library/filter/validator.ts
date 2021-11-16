/* eslint-disable no-unused-vars */

import { CollectionResponse } from "../../../../../src/types/types";

export type FilterValidationFormModel = {
  [K in keyof Pick<CollectionResponse, "name" | "owners">]: string
};

export const validateFilterForm = (
  model: Pick<CollectionResponse, "name" | "owners">,
  setErrors: (errorState: FilterValidationFormModel) => void,
): boolean => {
  let formIsValid = true;
  let errors: FilterValidationFormModel = { name: "", owners: "" };

  if (!model.name) {
    errors = { ...errors, name: "Name is required" };
    formIsValid = false;
  }

  if (model.owners?.length < 1) {
    errors = { ...errors, owners: "At least one owner needs to be specified" };
    formIsValid = false;
  }

  setErrors({ ...errors });
  return formIsValid;
};
