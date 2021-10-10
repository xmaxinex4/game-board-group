import React, { ReactNode } from "react";

import { makeStyles } from "@mui/styles";
import { Container, Grid } from "@mui/material";

const useStyles = makeStyles({
  gridContainerPadding: {
    paddingTop: 150,
  },
});

export function TabContentContainer(props: { children: ReactNode; }): React.ReactElement {
  const { children } = props;

  const { gridContainerPadding } = useStyles();

  return (
    <Container maxWidth="sm">
      <Grid container className={gridContainerPadding} justifyContent="center" alignItems="center" direction="column" spacing={4}>
        {children}
      </Grid>
    </Container>
  );
}
