/* eslint-disable no-unused-vars */

import { CollectionResponse } from "../../../../../src/types/types";

export type CreateCollectionValidationFormModel = {
  [K in keyof Pick<CollectionResponse, "name" | "owners">]: string
};

export const validateCreateCollectionForm = (
  model: Pick<CollectionResponse, "name" | "owners">,
  setErrors: (errorState: CreateCollectionValidationFormModel) => void,
): boolean => {
  let formIsValid = true;
  let errors: CreateCollectionValidationFormModel = { name: "", owners: "" };

  if (!model.name) {
    errors = { ...errors, name: "Name is required" };
    formIsValid = false;
  }

  if (model.owners?.length < 1) {
    errors = { ...errors, owners: "At least one owner needs to be specified" };
    formIsValid = false;
  }

  // TODO: Probably need more validation?
  // TODO: Update validation to check bggIds and ownerIds (no duplicates and current user should be an owner)

  setErrors({ ...errors });
  return formIsValid;
};
