import React from "react";
import { Link } from "react-router-dom";

import { AppBar, Grid, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import Logo from "../../../images/png/logo.png";

import { GameToolsLink } from "./game-tools-link";

const useStyles = makeStyles(() => ({
  navBar: {
    background: "transparent",
    boxShadow: "none",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
}));

export interface UnauthenticatedNavBarProps {
  homeLogo?: boolean;
}

export function UnauthenticatedNavBar(props: UnauthenticatedNavBarProps): React.ReactElement {
  const { homeLogo } = props;
  const { navBar, logo } = useStyles();

  return (
    <Grid container>
      <AppBar position="static" className={navBar}>
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              {
                homeLogo && (
                  <Link to="/">
                    <img className={logo} alt="" src={Logo} />
                  </Link>
                )
              }
            </Grid>
            <Grid item>
              <GameToolsLink />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
