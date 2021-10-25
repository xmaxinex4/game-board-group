import React, { ReactNode } from "react";

import { makeStyles } from "@mui/styles";
import {
  Container,
  Grid,
  Theme,
  Typography,
} from "@mui/material";

const useStyles = makeStyles<Theme, { hasTitle: boolean; }>((theme) => ({
  gridContainerPadding: {
    paddingTop: theme.spacing(4),
  },
  titlePadding: ({ hasTitle }) => ({
    paddingBottom: hasTitle ? theme.spacing(4) : "",
  }),
}));

export interface TabContentContainerProps {
  title?: string,
}

export function TabContentContainer(props: TabContentContainerProps & { children: ReactNode; }): React.ReactElement {
  const { children, title } = props;

  const { gridContainerPadding, titlePadding } = useStyles({ hasTitle: (!!title) });

  return (
    <Container maxWidth="xl">
      <Grid container className={gridContainerPadding} justifyContent="center" alignItems="center" direction="column">
        {title && (
          <Grid container item className={titlePadding} direction="column" alignItems="center" justifyContent="center">
            <Grid item>
              <Typography align="center" variant="h6">
                {title}
              </Typography>
            </Grid>
          </Grid>
        )}
        <Grid item sx={{ width: "100%" }}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}
