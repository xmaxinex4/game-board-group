import React from "react";
import { Switch, Route } from "react-router";
import { useSelector } from "react-redux";

import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Polls } from "./polls";
import { Stats } from "./stats";
import { Library } from "./library";
import { ManageGroup } from "./manage-group";
import { Home } from "./home";

import { SideNav } from "../../modules/common/navigation/side-nav";
import { NoActiveGroup } from "../../modules/group/no-active-group";
import { NavBar } from "../../modules/common/navigation/nav-bar";
import { MyCollections } from "./my-collections";
import { AccountSettings } from "./account-settings";
import { NotFound } from "../error/not-found";
import { selectActiveUser } from "../../modules/user/redux/slice";
import { selectActiveGroup } from "../../modules/group/redux/slice";

const useStyles = makeStyles({
  sideNav: {
    width: "10%",
  },
  sideNavContent: {
    width: "90%",
  },
});

export function AuthenticatedHomeRoutes(): React.ReactElement {
  const activeUser = useSelector(selectActiveUser);
  const activeGroup = useSelector(selectActiveGroup);

  const { sideNav, sideNavContent } = useStyles();

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
                        <Route exact path="/" component={Home} />
                        <Route path="/polls" component={Polls} />
                        <Route path="/stats" component={Stats} />
                        <Route path="/library" component={Library} />
                        <Route path="/manage-group" component={ManageGroup} />
                        <Route exact path="/my-game-collections" component={MyCollections} />
                        <Route path="/account" component={AccountSettings} />
                        <Route path="*" component={NotFound} />
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
