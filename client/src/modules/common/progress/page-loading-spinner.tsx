import React from "react";

import { CircularProgress, Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  padding: {
    padding: 100,
  },
});

export function PageLoadingSpinner(): React.ReactElement {
  const { padding } = useStyles();

  return (
    <Container maxWidth="sm">
      <Grid container className={padding} justifyContent="center" alignItems="center">
        <CircularProgress size={80} />
      </Grid>
    </Container>
  );
}
