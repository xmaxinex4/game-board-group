import * as React from 'react'
import { Typography, Button, Grid } from "@material-ui/core";
import { AddGroupButton } from "./add-group-button";

export const NoActiveGroup: React.FunctionComponent =
  () => {
    return (
      <Grid container direction="column">
        <Grid item>
          <Typography>It looks like you do not have any groups. Add a new group to get started.</Typography>
        </Grid>
        <Grid item>
          <AddGroupButton variant="text" />
        </Grid>
      </Grid>
    )
  }