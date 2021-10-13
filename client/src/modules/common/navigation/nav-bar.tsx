import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  AppBar,
  Grid,
  Toolbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { UserNavMenuButton } from "./user-nav-menu-button";
import { ActiveGroupSelector } from "../../group/active-group-selector";

import Logo from "../../../images/png/logo.png";
import { selectActiveUser } from "../../user/redux/slice";

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
  const activeUser = useSelector(selectActiveUser);

  return (
    <Grid container>
      <AppBar className={appBar} color="transparent" position="static">
        <Toolbar>
          <Grid item container xs={12} alignItems="center" justifyContent="space-between" className={appBarContainer}>
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
