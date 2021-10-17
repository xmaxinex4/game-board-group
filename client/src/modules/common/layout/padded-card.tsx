/* eslint-disable react/jsx-props-no-spreading */

import React, { ReactNode } from "react";

import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Card, CardProps, Grid } from "@mui/material";

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

export interface PaddedCardProps extends CardProps {
  styleProps?: PaddedCardStyleProps;
}

export function PaddedCard(props: PaddedCardProps & { children: ReactNode; }): React.ReactElement {
  const { children, styleProps, ...cardProps } = props;

  const { container, card } = useStyles(styleProps || {});

  return (
    <Grid container className={container}>
      <Card className={card} {...cardProps}>
        {children}
      </Card>
    </Grid>
  );
}
