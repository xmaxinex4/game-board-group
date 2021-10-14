/* eslint-disable no-unused-vars */

import { Collection } from ".prisma/client";

export type CreateCollectionValidationFormModel = Pick<Collection, "name">;

export const validateCreateCollectionForm = (
  model: CreateCollectionValidationFormModel,
  setErrors: (errorState: CreateCollectionValidationFormModel) => void,
): boolean => {
  let formIsValid = true;
  let errors: CreateCollectionValidationFormModel = { name: "" };

  if (!model.name) {
    errors = { ...errors, name: "Name is required" };
    formIsValid = false;
  }

  // TODO: Probably need more validation?
  // TODO: Update validation to check bggIds and ownerIds (no duplicates and current user should be an owner)

  setErrors({ ...errors });
  return formIsValid;
};
