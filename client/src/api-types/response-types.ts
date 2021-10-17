import { Group, GroupMember, User } from ".prisma/client";
import { LibraryGame } from "../modules/library/types";

export interface UserMeResponse extends User {
  groupMemberships: (GroupMember & { group: Group; })[];
}

export interface LibraryReponse {
  library: {
    [key: string]: LibraryGame;
  };
}