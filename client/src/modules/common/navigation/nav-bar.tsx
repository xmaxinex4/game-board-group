import React, { useContext } from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Grid,
  Toolbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { UserNavMenuButton } from "./user-nav-menu-button";
import { ActiveGroupSelector } from "../../group/active-group-selector";

import Logo from "../../../images/png/logo.png";
import { ActiveUserContext } from "../../../contexts/active-user-context";

const useStyles = makeStyles(() => ({
  appBar: {
    boxShadow: "none",
  },
  appBarContainer: {
    boxShadow: "0px 15px 10px -15px #111",
  },
}));

export function NavBar(): React.ReactElement {
  const { appBar, appBarContainer } = useStyles();
  const { activeUser } = useContext(ActiveUserContext);

  return (
    <Grid container>
      <AppBar className={appBar} color="transparent" position="static">
        <Toolbar>
          <Grid container xs={12} alignItems="center" justifyContent="space-between" className={appBarContainer}>
            <Grid item>
              <Link to="/">
                <img alt="" src={Logo} />
              </Link>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                {
                  activeUser?.groupMemberships && activeUser?.groupMemberships?.length > 0 && (
                    <Grid item>
                      <ActiveGroupSelector />
                    </Grid>
                  )
                }
                <Grid item>
                  <UserNavMenuButton />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
