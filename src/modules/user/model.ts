export interface CurrentUser {
  id: string;
  username: string;
  color: string;
  email: string;
  groupMemberships: CurrentUserGroupMembership[];
}

export interface CurrentUserGroupMembership {
  group: CurrentUserGroup;
}

export interface CurrentUserGroup {
  id: string;
  name: string;
}

export interface CurrentUserQuery {
  me: CurrentUser;
}