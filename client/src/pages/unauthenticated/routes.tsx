import React from "react";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";

import { Grid } from "@mui/material";

import { MeepleCircleSiteNameInline } from "../../images/components/meeple-circle-site-name-inline";

import { Login } from "./login";
import { CreateAccount } from "./create-account";
import { ForgotPassword } from "./forgot-password";
import { UnauthenticatedNavBar } from "../../modules/common/navigation/unauthenticated-nav-bar";
import { TermsOfService } from "../authenticated/terms-of-service";
import { PrivacyPolicy } from "../authenticated/privacy-policy";
import { NavFooter } from "../../modules/common/navigation/nav-footer";

export function UnAuthenticatedRoutes(): React.ReactElement {
  const isPrivacyPolicyRoute = useRouteMatch("/privacy-policy");
  const isTermsOfServiceRoute = useRouteMatch("/terms-of-service");

  return (
    <Grid container justifyContent="center">
      <Grid xs={12} item>
        <UnauthenticatedNavBar />
      </Grid>
      <Grid
        xs={12}
        item
        container
        sx={{ maxWidth: (isPrivacyPolicyRoute || isTermsOfServiceRoute) ? "1000px" : "500px" }}
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid onClick={() => null} xs={12} sx={{ maxWidth: "400px" }} item>
          <MeepleCircleSiteNameInline />
        </Grid>
        <Grid xs={12} item sx={{ minHeight: "calc(100vh - 380px)" }}>
          <Switch>
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/login" component={Login} />
            <Route exact path="/terms-of-service" component={TermsOfService} />
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route exact path="*" component={() => <Redirect to="/login" />} />
          </Switch>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <NavFooter />
      </Grid>
    </Grid>
  );
}
