import React from "react";

import { Grid, Typography } from "@mui/material";

import { GroupMember } from ".prisma/client";

export interface GroupMemberDisplayProps {
  groupMember: GroupMember;
}

export function GroupMemberDisplay(props: GroupMemberDisplayProps): React.ReactElement {
  const { groupMember } = props;

  return (
    <Grid container>
      <Typography>
        {`${groupMember} GroupMember Display Placeholder`}
      </Typography>
    </Grid>
  );
}
