import React from "react";

import { makeStyles } from "@material-ui/styles";
import { Grid, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles<Theme>((theme) => ({
  image: {
    width: "100%",
    height: "100%",
    borderRadius: `${theme.spacing(0.5)}px`,
    boxShadow: theme.shadows[1],
  },
}));

export interface ValeriaCardKingdomsCardProps {
  title: string;
  imgSrc: string;
}

export function ValeriaCardKingdomsCardDisplay(props: ValeriaCardKingdomsCardProps): React.ReactElement {
  const { title, imgSrc } = props;

  const { image } = useStyles();

  return (
    <Grid container justify="center">
      <Grid item>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item>
        <img className={image} src={imgSrc} alt="" />
      </Grid>
    </Grid>
  );
}
