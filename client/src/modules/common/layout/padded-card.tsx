import React, { ReactNode } from "react";

import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Card, Grid } from "@mui/material";

const useStyles = makeStyles<Theme, PaddedCardStyleProps>((theme: Theme) => ({
  container: ({ outerPadding }) => ({
    padding: outerPadding && `${theme.spacing(outerPadding)}`,
  }),
  card: ({ innerPadding }) => ({
    padding: innerPadding && `${theme.spacing(innerPadding)}`,
    width: "100%",
  }),
}));

export interface PaddedCardStyleProps {
  innerPadding?: number;
  outerPadding?: number;
}

export interface PaddedCardProps {
  styleProps?: PaddedCardStyleProps;
}

export function PaddedCard(props: PaddedCardProps & { children: ReactNode; }): React.ReactElement {
  const { children, styleProps } = props;

  const { container, card } = useStyles(styleProps || {});

  return (
    <Grid container className={container}>
      <Card className={card}>
        {children}
      </Card>
    </Grid>
  );
}
