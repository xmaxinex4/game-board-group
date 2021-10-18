import { LibraryGame } from "../modules/library/types";
import { MeeplePaletteColorTheme } from "../theme/meeple-palettes";

export interface UserResponse {
  id: string;
  username: string;
  color: keyof MeeplePaletteColorTheme;
  groupMemberships: GroupMemberResponse[];
}

export interface MeUserResponse extends UserResponse {
  email: string;
}

export interface GroupMemberResponse {
  id: string;
  isAdmin: boolean;
  group: GroupResponse;
}

export interface GroupResponse {
  id: string;
  name: string;
  members: MembershipResponse[];
}

export interface MembershipResponse {
  id: string;
  isAdmin: string;
  user: Omit<UserResponse, "groupMemberships">;
}

export interface LibraryReponse {
  library: {
    [key: string]: LibraryGame;
  };
}
