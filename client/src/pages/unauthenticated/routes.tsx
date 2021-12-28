import React from "react";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";

import { Grid } from "@mui/material";

import { MeepleCircleSiteNameInline } from "../../images/components/meeple-circle-site-name-inline";
import { NavFooter } from "../../modules/common/navigation/nav-footer";
import { UnauthenticatedNavBar } from "../../modules/common/navigation/unauthenticated-nav-bar";
import { PrivacyPolicy } from "../authenticated/privacy-policy";

import { Login } from "./login";
import { CreateAccount } from "./create-account/create-account";
import { ForgotPassword } from "./forgot-password/forgot-password";
import { TermsAndConditions } from "../authenticated/terms-and-conditions";
import { ActivateAccount } from "./activate-account/activate-account";
import { ResetPassword } from "./reset-password/reset-password";

export function UnAuthenticatedRoutes(): React.ReactElement {
  const isPrivacyPolicyRoute = useRouteMatch("/privacy-policy");
  const isTermsAndConditionsRoute = useRouteMatch("/terms-and-conditions");

  return (
    <Grid container justifyContent="center">
      <Grid xs={12} item>
        <UnauthenticatedNavBar />
      </Grid>
      <Grid
        xs={12}
        item
        container
        sx={{ maxWidth: (isPrivacyPolicyRoute || isTermsAndConditionsRoute) ? "1000px" : "500px" }}
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
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/activate-account" component={ActivateAccount} />
            <Route path="/login" component={Login} />
            <Route exact path="/terms-and-conditions" component={TermsAndConditions} />
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
