import React from "react";

import { Grid, Typography } from "@mui/material";

import { Play } from ".prisma/client";

export interface PlayDisplayProps {
  play: Play;
}

export function PlayDisplay(props: PlayDisplayProps): React.ReactElement {
  const { play } = props;
  return (
    <Grid container>
      <Typography>
        {`${play} Play Display Placeholder`}
      </Typography>
    </Grid>
  );
}
