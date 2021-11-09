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
  titleAction?: React.ReactNode;
}

export function TabContentContainer(props: TabContentContainerProps & { children: ReactNode; }): React.ReactElement {
  const { children, title, titleAction } = props;

  const { gridContainerPadding, titlePadding } = useStyles({ hasTitle: (!!title) });

  return (
    <Container maxWidth="xl">
      <Grid container className={gridContainerPadding} justifyContent="center" alignItems="center" direction="column">
        {title && (
          <Grid container item className={titlePadding} alignItems="flex-end" justifyContent="center" spacing={1}>
            <Grid item>
              <Typography align="center" variant="h6">
                {title}
              </Typography>
            </Grid>
            {titleAction && (
              <Grid item>
                {titleAction}
              </Grid>
            )}
          </Grid>
        )}
        <Grid item sx={{ width: "100%" }}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}
