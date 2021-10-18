import React from "react";

import {
  Grid,
} from "@mui/material";

import { MembershipResponse } from "../../api-types/response-types";
import { UserCircleListDisplay } from "../user/user-circle-list-display";

export interface GroupManagementUserListDisplayProps {
  memberships: MembershipResponse[];
}

export function GroupManagementUserListDisplay(props: GroupManagementUserListDisplayProps): React.ReactElement {
  const { memberships } = props;

  return (
    <Grid container spacing={2} alignItems="center">
      <UserCircleListDisplay showNames users={memberships.map((member) => member.user)} />
    </Grid>
  );
}
