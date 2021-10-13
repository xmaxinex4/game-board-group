import { Collection } from ".prisma/client";

export type UpdateCollectionFormModel = Partial<Collection> & {
  gameIds: string[];
  ownerIds: string[];
};
