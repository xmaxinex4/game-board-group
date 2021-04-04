import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router';

import { Grid, Typography, makeStyles } from "@material-ui/core";

import { MyGroups } from './my-groups';
import { MyCollections } from './my-collections';

import { ActiveUserContext } from "../Contexts";
import { NavBar } from '../modules/common/navigation';

const useStyles = makeStyles({
  fullWidth: {
    width: "100%"
  }
});

export const Account: React.FunctionComponent = () => {
  const activeUserContext = React.useContext(ActiveUserContext);

  const { fullWidth } = useStyles({});

  return (
    <>
      <NavBar user={activeUserContext.activeUser} />
      <Grid container item className={fullWidth}>
        <Switch>
          <Route exact path="/account">
            <Typography>Account</Typography>
          </Route>
          <Route exact path="/account/groups" component={MyGroups} />
          <Route exact path="/account/collections" component={MyCollections} />
          <Route path="*" component={() => <Redirect to="/not-found" />} />
        </Switch>
      </Grid>
    </>
  )
}