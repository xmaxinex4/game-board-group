import * as React from 'react'

import { makeStyles } from "@material-ui/styles";
import { Grid } from '@material-ui/core';

const backgroundImage = require("../../../images/background.png");

const useBacksplashStyles = makeStyles({
  backsplash: {
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    background: `linear-gradient(to bottom, rgba(128, 226, 126, 0.52), rgba(0, 122, 193, 0.73)), url(${backgroundImage})`,
    "-webkit-background-size": "cover",
    "-moz-background-size": "cover",
    "-o-background-size": "cover",
    minHeight: "100%"
  },

  backsplashContent: {
    display: "block",
    position: "relative"
  }
});


export const Backsplash: React.FunctionComponent = ({ children }) => {
  const styles = useBacksplashStyles({});

  return (
    <div className={styles.backsplash}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          {children}
        </Grid>
      </Grid>
    </div>
  )
}