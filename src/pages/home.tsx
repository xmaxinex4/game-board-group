import * as React from 'react'
import { Switch, Redirect, Route } from "react-router";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";


import { SideNav } from "../modules/common/navigation/side-nav";
import { ActiveGroupContext } from "../contexts/active-group-context";
import { ActiveUserContext } from "../contexts/active-user-context";

import { Polls } from './polls';
import { Stats } from './stats';
import { Library } from './library';
import { ManageGroup } from './manage-group';
import { NoActiveGroup } from '../modules/group/no-active-group';
import { NavBar } from '../modules/common/navigation/nav-bar';

const useStyles = makeStyles({
  sideNav: {
    width: "15%"
  },
  sideNavContent: {
    width: "85%"
  }
});

export const Home: React.FunctionComponent = () => {
  const activeUserContext = React.useContext(ActiveUserContext);
  const activeGroupContext = React.useContext(ActiveGroupContext);

  const { sideNav, sideNavContent } = useStyles({});

  return (
    <>
      <NavBar showGroup user={activeUserContext.activeUser} />

      {activeGroupContext.activeGroup
        ?
        <Grid container>
          <Grid className={sideNav} item>
            <SideNav />
          </Grid>
          <Grid className={sideNavContent} item>
            <Switch>
              <Route exact path="/">
                <Typography>Home</Typography>
              </Route>
              <Route exact path="/polls" component={Polls} />
              <Route exact path="/stats" component={Stats} />
              <Route exact path="/library" component={Library} />
              <Route exact path="/manage-group" component={ManageGroup} />
              <Route path="*" component={() => <Redirect to="/not-found" />} />
            </Switch >
          </Grid>
        </Grid>
        :
        <NoActiveGroup />
      }
    </>
  )
}