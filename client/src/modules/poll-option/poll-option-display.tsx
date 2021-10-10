import React from "react";

import { Grid, Avatar } from "@mui/material";

import { PollOption } from "../../api-types/poll-option";

export interface PollOptionDisplayProps {
  option: PollOption;
}

export function PollOptionDisplay(props: PollOptionDisplayProps): React.ReactElement {
  const { option } = props;

  return (
    <Grid container direction="column">
      {option.userVotes.map((vote) =>
        <Grid item>
          This vote is {vote.veto ? "" : "not"} a veto
        </Grid>
      )}
      <Grid item>
        <Avatar>{option.game.name.charAt(0)}</Avatar>
      </Grid>
    </Grid>
  );
}
