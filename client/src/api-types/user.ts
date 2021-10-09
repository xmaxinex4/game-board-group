import { MeeplePaletteColorTheme } from "../theme/meeple-palettes";

import { Collection } from "./collection";
import { GroupMember } from "./group-member";
import { Poll } from "./poll";
import { Score } from "./score";
import { UserVote } from "./user-vote";

export type User = {
  id: string,
  createdAt: Date,
  updatedAt: Date,
  email: string,
  username: string,
  password: string,
  polls: Poll[],
  color: keyof MeeplePaletteColorTheme,
  gameCollections: Collection[],
  groupMemberships: GroupMember[],
  resetToken: string,
  resetTokenExpiry: number,
  scores: Score[],
  userVotes: UserVote[],
};