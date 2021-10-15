import React from "react";
import { useSelector } from "react-redux";

import {
  AppBar,
  Grid,
  Theme,
  Toolbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { ActiveGroupSelector } from "../../group/active-group-selector";
import { selectActiveUser } from "../../user/redux/slice";

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
  const activeUser = useSelector(selectActiveUser);

  return (
    <Grid container>
      <AppBar className={appBar} color="transparent" position="static">
        <Toolbar>
          <Grid item container alignItems="center" justifyContent="space-between" spacing={2}>
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
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
