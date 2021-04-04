import { Collection } from "./collection"
import { GroupMember } from "./group-member"
import { Poll } from "./poll"
import { Score } from "./score"
import { UserVote } from "./user-vote"

export type User = {
  id: string,
  createdAt: Date,
  updatedAt: Date,
  email: string,
  username: string,
  password: String,
  polls: Poll[],
  color: String,
  gameCollections: Collection[],
  groupMemberships: GroupMember[],
  resetToken: String,
  resetTokenExpiry: number,
  scores: Score[],
  userVotes: UserVote[],
}