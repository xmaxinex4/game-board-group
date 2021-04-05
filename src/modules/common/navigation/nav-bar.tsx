import * as React from 'react';
import { Link } from 'react-router-dom';

import Logo from "../../Images/logo.png";

import { AppBar, Grid, Toolbar } from '@material-ui/core';

import { UserNavMenuButton } from "./user-nav-menu-button";
import { User } from '../../../api-types/user';
import { ActiveGroupSelector } from '../../group/active-group-selector';

export interface NavBarProps {
  showGroup?: boolean;
  user: User;
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