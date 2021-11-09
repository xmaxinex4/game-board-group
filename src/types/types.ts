import { Prisma, Color } from "@prisma/client";

/******************************* User Play Preferences */

export interface UserPlayPreferenceResponse {
  id: string;
  preference: string;
  game: {
    bggId: string;
  };
}

export const UserPlayPreferenceResponsePrismaSelect: Prisma.UserPlayPreferenceSelect = {
  id: true,
  preference: true,
  game: {
    select: {
      bggId: true,
    }
  },
};

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
  isAdmin: boolean;
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

export interface GameDetails {
  description: string,
  minPlayers: number,
  maxPlayers: number,
  minPlayTime: number,
  maxPlayTime: number,
  minAge: number,
  categories: string[];
  mechanics: string[];
  designers: string[];
  artists: string[];
  publishers: string[];
  rating: number;
  complexity: number;
}

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
