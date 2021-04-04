import * as React from "react";
import { compose } from "recompose";

import { Grid, Avatar } from "@material-ui/core";

import { PollOption } from "../../Models/PollOption";

export interface IPollOptionDisplayProps {
  option: PollOption;
}

export const PollOptionDisplay = compose<IPollOptionDisplayProps, IPollOptionDisplayProps>(
)(({ option }) => (
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
))