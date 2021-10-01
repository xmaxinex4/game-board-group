import React from "react";
import { Link } from "react-router-dom";

import { AppBar, Grid, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { UserNavMenuButton } from "./user-nav-menu-button";
import { User } from "../../../api-types/user";
import { ActiveGroupSelector } from "../../group/active-group-selector";

import Logo from "../../../images/png/logo.png";

const useStyles = makeStyles(() => ({
  appBar: {
    boxShadow: "none",
  },
}));

export interface NavBarProps {
  showGroup?: boolean;
  user: User;
}

export function NavBar(props: NavBarProps): React.ReactElement {
  const { showGroup, user } = props;

  const { appBar } = useStyles();

  return (
    <Grid container>
      <AppBar className={appBar} color="transparent" position="static">
        <Toolbar>
          <Grid container xs={12} alignItems="center" justify="space-between">
            <Grid item>
              <Link to="/">
                <img alt="" src={Logo} />
              </Link>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                {
                  showGroup && (
                    <Grid item>
                      <ActiveGroupSelector />
                    </Grid>
                  )
                }
                <Grid item>
                  <UserNavMenuButton user={user} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
