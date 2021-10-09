import React, { ReactNode } from "react";

import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

const useStyles = makeStyles<Theme, PageStyleProps>((theme: Theme) => ({
  root: ({ paddingTop }) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    paddingTop: paddingTop && `${theme.spacing(paddingTop)}px`,
  }),
}));

export interface PageStyleProps {
  paddingTop?: number;
}

export interface PageProps {
  styleProps?: PageStyleProps;
}

export function Page(props: PageProps & { children: ReactNode; }): React.ReactElement {
  const { children, styleProps } = props;

  const { root } = useStyles(styleProps || {});

  return (
    <Grid className={root} container>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
}
