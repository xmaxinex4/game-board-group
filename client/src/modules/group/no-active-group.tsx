import React from "react";

import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { makeStyles } from "@mui/styles";

import {
  Button,
  Typography,
  Grid,
  Container,
} from "@mui/material";

const useStyles = makeStyles({
  gridContainerPadding: {
    paddingTop: 150,
  },
});

export function NoActiveGroup(): React.ReactElement {
  const { gridContainerPadding } = useStyles();

  return (
    <Container maxWidth="sm">
      <Grid container className={gridContainerPadding} justifyContent="center" alignItems="center" direction="column" spacing={4}>
        <Grid container item direction="column" alignItems="center" spacing={1}>
          <Grid item>
            <Typography>It looks like you don&apos;t have any groups.</Typography>
          </Grid>
          <Grid item>
            <Typography>Let&apos;s add a new group to get started!</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Button variant="outlined" startIcon={<Icon path={mdiPlus} size={0.5} />}>Add Group</Button>
        </Grid>
      </Grid>
    </Container>
  );
}
