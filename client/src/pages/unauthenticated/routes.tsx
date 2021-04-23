import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import { Grid } from "@material-ui/core";

import { MeepleCircleSiteNameInline } from "../../images/components/meeple-circle-site-name-inline";

import { Login } from "./login";
import { CreateAccount } from "./create-account";
import { ForgotPassword } from "./forgot-password";
import { UnauthenticatedNavBar } from "../../modules/common/navigation/unauthenticated-nav-bar";

export function UnAuthenticatedRoutes(): React.ReactElement {
  return (
    <>
      <UnauthenticatedNavBar />
      <Grid container direction="column" alignItems="center" justify="center" spacing={2}>
        <Grid item>
          <MeepleCircleSiteNameInline />
        </Grid>
        <Grid item>
          <Switch>
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/login" component={Login} />
            <Route exact path="*" component={() => <Redirect to="/login" />} />
          </Switch>
        </Grid>
      </Grid>
    </>
  );
}
