import { Group, GroupMember, User } from ".prisma/client";

export interface UserMeResponse extends User {
  groupMemberships: (GroupMember & { group: Group; })[];
}