import React from "react";

import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  span: {
    paddingTop: "200px",
    paddingBottom: "50px",
  },
});

export function NotFound(): React.ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.span}>
      <Typography>Not Found</Typography>
    </div>
  );
}
