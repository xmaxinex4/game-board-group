import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";

import {
  AppBar,
  Grid,
  Theme,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { activeUserGroupMemberships } from "../../../redux/active-user-group-memberships-slice";

import { ActiveGroupSelector } from "../../group/active-group-selector";

import { UserNavMenuButton } from "./user-nav-menu-button";

const useStyles = makeStyles<Theme>((theme) => ({
  appBar: {
    boxShadow: "0px 15px 10px -15px #111",
    paddingBottom: theme.spacing(2),
  },
}));

export function NavBar(): React.ReactElement {
  const {
    appBar,
  } = useStyles();
  const userGroupMemberships = useSelector(activeUserGroupMemberships);
  const isMyGamesRoute = useRouteMatch("/my-game-collections");
  const theme = useTheme<Theme>();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid container>
      <AppBar className={appBar} color="transparent" position="static">
        <Toolbar sx={{ marginLeft: userGroupMemberships && userGroupMemberships?.groupMemberships?.length > 0 ? "unset" : "auto" }}>
          <Grid
            item
            container
            alignItems={isMdUp ? "center" : "flex-start"}
            justifyContent={isMyGamesRoute ? "flex-end" : "space-between"}
            spacing={2}
          >
            {
              !isMyGamesRoute && userGroupMemberships && userGroupMemberships?.groupMemberships?.length > 0 && (
                <Grid item>
                  <ActiveGroupSelector />
                </Grid>
              )
            }
            <Grid item>
              <UserNavMenuButton />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
