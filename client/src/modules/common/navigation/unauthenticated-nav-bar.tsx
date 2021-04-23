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
}));

export interface UnauthenticatedNavBarProps {
  homeLogo?: boolean;
}

export function UnauthenticatedNavBar(props: UnauthenticatedNavBarProps): React.ReactElement {
  const { homeLogo } = props;
  const { navBar } = useStyles();

  return (
    <Grid container>
      <AppBar position="static" className={navBar}>
        <Toolbar>
          <Grid container xs={12} alignItems="center" justify="space-between">
            <Grid item>
              {
                homeLogo && (
                  <Link to="/">
                    <img alt="" src={Logo} />
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
