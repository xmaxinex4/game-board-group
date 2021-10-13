import { Collection } from ".prisma/client";


export type CreateCollectionFormModel = Partial<Collection> & {
  gameIds: string[];
  ownerIds: string[];
};
