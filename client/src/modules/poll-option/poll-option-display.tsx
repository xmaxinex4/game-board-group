import React from "react";

import { Grid } from "@mui/material";

import { PollOption } from "@prisma/client";

export interface PollOptionDisplayProps {
  option: PollOption;
}

export function PollOptionDisplay(props: PollOptionDisplayProps): React.ReactElement {
  const { option } = props;

  console.log("poll option: ", option);

  return (
    <Grid container direction="column">
      {/* {option.userVotes.map((vote) =>
        <Grid item key={`poll-option-user-vote-display-vote-id-${vote.id}`}>
          This vote is {vote.veto ? "" : "not"} a veto
        </Grid>
      )}
      <Grid item>
        <Avatar>{option.game.name.charAt(0)}</Avatar>
      </Grid> */}
    </Grid>
  );
}
