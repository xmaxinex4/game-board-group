import React from "react";

import { Grid } from '@material-ui/core';

export function BacksplashContent(props: { children: React.ReactNode; }): React.ReactElement {
  const { children } = props;

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        {children}
      </Grid>
    </Grid>
  );
}
