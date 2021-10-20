import { MeeplePaletteColorTheme } from "./theme/meeple-palettes";

export interface UserResponse {
  id: string;
  color: keyof MeeplePaletteColorTheme;
  username: string;
}

export interface ActiveUserResponse extends UserResponse {
  email: string;
}

export interface ActiveUserGroupMembershipsResponse {
  groupMemberships: GroupMembershipResponse[];
}

export interface GroupMembershipResponse {
  id: string;
  isAdmin: boolean;
  group: GroupResponse;
  activeInvitationLink: string;
}

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

export interface GameReponse {
  bggId: string,
  name: string,
  urlImage: string,
  urlThumb: string,
  year: string,
}

export interface CollectionResponse {
  id: string,
  name: string,
  games: GameReponse[],
  owners: UserResponse[],
}

export interface CollectionsResponse {
  collections: CollectionResponse[];
}