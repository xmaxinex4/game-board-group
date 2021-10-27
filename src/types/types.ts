import { Prisma, Color } from "@prisma/client";

/******************************* Users */
export interface UserResponse {
  id: string;
  color: Color;
  username: string;
}

export const UserResponsePrismaSelect: Prisma.UserSelect = {
  id: true,
  color: true,
  username: true,
};

export interface ActiveUserResponse extends UserResponse {
  email: string;
}

export const ActiveUserResponsePrismaSelect: Prisma.UserSelect = {
  id: true,
  color: true,
  username: true,
  email: true,
};

/******************************* Groups & Group Memberships */
export interface GroupResponse {
  id: string;
  name: string;
  members: UserMembershipResponse[];
}

export interface UserMembershipResponse {
  id: string;
  isAdmin: string;
  user: UserResponse;
}

export const UserGroupMembershipResponsePrismaSelect: Prisma.GroupMemberSelect = {
  id: true,
  isAdmin: true,
  user: {
    select: {
      ...UserResponsePrismaSelect,
    },
  },
};

export const GroupResponsePrismaSelect: Prisma.GroupSelect = {
  id: true,
  name: true,
  members: {
    select: {
      ...UserGroupMembershipResponsePrismaSelect,
    },
  },
};

export interface GroupMembershipResponse {
  id: string;
  isAdmin: boolean;
  group: GroupResponse;
  activeInvitationLink: string;
}

export const GroupMembershipResponsePrismaSelect: Prisma.GroupMemberSelect = {
  id: true,
  isAdmin: true,
  group: {
    select: {
      ...GroupResponsePrismaSelect,
    },
  },
};

export interface ActiveUserGroupMembershipsResponse {
  groupMemberships: GroupMembershipResponse[];
}

/******************************* Library Games */
export interface LibraryGame {
  bggId: string;
  copies: number;
  name: string;
  urlImage: string | null;
  urlThumb: string | null;
  year: string | null;
  owners: UserResponse[];
}

export interface LibraryReponse {
  library: {
    [key: string]: LibraryGame;
  };
}

/******************************* Games */
export interface GameResponse {
  bggId: string,
  name: string,
  urlImage: string,
  urlThumb: string,
  year: string,
}

export const GameResponsePrismaSelect = {
  bggId: true,
  name: true,
  urlImage: true,
  urlThumb: true,
  year: true,
};

/******************************* Collections */
export interface CollectionResponse {
  id: string,
  name: string,
  games: GameResponse[],
  owners: UserResponse[],
}

export interface CollectionsResponse {
  collections: CollectionResponse[];
}

export const CollectionResponsePrismaSelect: Prisma.CollectionSelect = {
  id: true,
  name: true,
  games: {
    select: {
      ...GameResponsePrismaSelect,
    },
  },
  owners: {
    select: {
      ...UserResponsePrismaSelect,
    },
  }
};
