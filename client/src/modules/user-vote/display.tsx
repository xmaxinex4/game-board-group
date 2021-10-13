import React from "react";

import { Grid, Typography } from "@mui/material";

import { UserVote } from ".prisma/client";

export interface UserVoteDisplayProps {
  userVote: UserVote;
}

export function UserVoteDisplay(props: UserVoteDisplayProps): React.ReactElement {
  const { userVote } = props;

  return (
    <Grid container>
      <Typography>
        {`${userVote} User Vote Display Placeholder`}
      </Typography>
    </Grid>
  );
}
