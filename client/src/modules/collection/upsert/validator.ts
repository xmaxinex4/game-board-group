/* eslint-disable no-unused-vars */

import { CollectionResponse } from "../../../../../src/types/types";

export type UpsertCollectionValidationFormModel = {
  [K in keyof Pick<CollectionResponse, "name" | "owners">]: string
};

export const validateUpsertCollectionForm = (
  model: Pick<CollectionResponse, "name" | "owners">,
  setErrors: (errorState: UpsertCollectionValidationFormModel) => void,
): boolean => {
  let formIsValid = true;
  let errors: UpsertCollectionValidationFormModel = { name: "", owners: "" };

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
