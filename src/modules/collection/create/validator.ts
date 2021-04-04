export interface UpsertCollectionErrorFormModel {
  name: string;
}

// TODO: Update validation to check bggIds and ownerIds (no duplicates and current user should be an owner)
export const validateUpsertCollectionForm = (model: UpsertCollectionErrorFormModel, setErrors: (errorState: UpsertCollectionErrorFormModel) => void): boolean => {
  let formIsValid = true;
  let errors = { name: "" };

  if (!model.name) {
    errors = { ...errors, name: "Name is required" };
    formIsValid = false;
  }

  setErrors({ ...errors });
  return formIsValid;
}