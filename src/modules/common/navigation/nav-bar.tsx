import * as React from 'react';
import { Link } from 'react-router-dom';

import Logo from "../../Images/logo.png";

import { AppBar, Grid, Toolbar } from '@material-ui/core';

import { UserNavMenuButton } from "./user-nav-menu-button";
import { ActiveGroupSelector } from "../../Modules/Group";
import { CurrentUser } from '../../Modules/User';

export interface NavBarProps {
  showGroup?: boolean;
  user: CurrentUser;
}

export const NavBar: React.FunctionComponent<NavBarProps> = ({ showGroup, user }) => {
  return (
    <Grid container>
      <AppBar position="static">
        <Toolbar>
          <Grid container xs={12} alignItems="center" justify="space-between">
            <Grid item>
              <Link to="/">
                <img src={Logo} />
              </Link>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                {showGroup &&
                  <Grid item>
                    <ActiveGroupSelector />
                  </Grid>
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