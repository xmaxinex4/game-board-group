import React from "react";

import { CircularProgress, Container, Grid } from "@mui/material";

export function PageLoadingSpinner(): React.ReactElement {
  return (
    <Container maxWidth="sm">
      <Grid container sx={{ padding: "100px" }} justifyContent="center" alignItems="center">
        <CircularProgress size={80} />
      </Grid>
    </Container>
  );
}
