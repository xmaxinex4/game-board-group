import React from "react";
import { Switch, Route } from "react-router";

import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Polls } from "../polls";
import { Stats } from "../stats";
import { Library } from "../library";
import { ManageGroup } from "../manage-group";
import { AccountRoutes } from "../account/routes";

import { ActiveGroupContext } from "../../../contexts/active-group-context";
import { ActiveUserContext } from "../../../contexts/active-user-context";
import { SideNav } from "../../../modules/common/navigation/side-nav";
import { NoActiveGroup } from "../../../modules/group/no-active-group";
import { NavBar } from "../../../modules/common/navigation/nav-bar";

const useStyles = makeStyles({
  sideNav: {
    width: "10%",
  },
  sideNavContent: {
    width: "90%",
  },
});

export function AuthenticatedHomeRoutes(): React.ReactElement {
  const { activeUser } = React.useContext(ActiveUserContext);
  const { activeGroup } = React.useContext(ActiveGroupContext);

  const { sideNav, sideNavContent } = useStyles({});

  return (
    <>
      {
        activeUser && (
          <>
            <NavBar />
            {
              activeGroup
                ? (
                  <Grid container>
                    <Grid className={sideNav} item>
                      <SideNav />
                    </Grid>
                    <Grid className={sideNavContent} item>
                      <Switch>
                        <Route exact path="/">
                          <Typography>Home</Typography>
                        </Route>
                        <Route path="/polls" component={Polls} />
                        <Route path="/stats" component={Stats} />
                        <Route path="/library" component={Library} />
                        <Route path="/manage-group" component={ManageGroup} />
                        <Route path="/account" component={AccountRoutes} />
                        {/* <Route path="*" component={() => <Redirect to="/not-found" />} /> */}
                      </Switch>
                    </Grid>
                  </Grid>
                ) : <NoActiveGroup />
            }
          </>
        )
      }
    </>
  );
}
