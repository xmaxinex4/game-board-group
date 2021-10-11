import React, { ReactNode } from "react";

import { makeStyles } from "@mui/styles";
import {
  Container,
  Grid,
  Theme,
  Typography,
} from "@mui/material";

const useStyles = makeStyles<Theme>((theme) => ({
  gridContainerPadding: {
    paddingTop: theme.spacing(8),
  },
  gridItemPadding: {
    paddingTop: theme.spacing(4),
  },
}));

export interface TabContentContainerProps {
  title?: string,
  subTitle?: string,
}

export function TabContentContainer(props: TabContentContainerProps & { children: ReactNode; }): React.ReactElement {
  const { children, title, subTitle } = props;

  const { gridContainerPadding, gridItemPadding } = useStyles();

  return (
    <Container maxWidth="sm">
      <Grid container className={gridContainerPadding} justifyContent="center" alignItems="center" direction="column">
        {title && (
          <Grid container item className={gridItemPadding} direction="column" alignItems="center" justifyContent="center">
            <Grid item>
              <Typography align="center" variant="h6">
                {title}
              </Typography>
              {subTitle && (
                <Grid item>
                  <Typography align="center" variant="h6">
                    {subTitle}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
        <Grid item className={gridItemPadding}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}
