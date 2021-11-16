import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { MeepleCircleSiteNameInline } from "../../images/components/meeple-circle-site-name-inline";

import { Login } from "./login";
import { CreateAccount } from "./create-account";
import { ForgotPassword } from "./forgot-password";
import { UnauthenticatedNavBar } from "../../modules/common/navigation/unauthenticated-nav-bar";
import { TermsOfService } from "../authenticated/terms-of-service";
import { PrivacyPolicy } from "../authenticated/privacy-policy";
import { NavFooter } from "../../modules/common/navigation/nav-footer";

const useStyles = makeStyles(() => ({
  gridContainer: {
    maxWidth: "500px",
  },
  logo: {
    maxWidth: "400px",
  },
}));

export function UnAuthenticatedRoutes(): React.ReactElement {
  const { gridContainer, logo } = useStyles();

  return (
    <Grid container justifyContent="center">
      <Grid xs={12} item>
        <UnauthenticatedNavBar />
      </Grid>
      <Grid
        xs={12}
        item
        container
        className={gridContainer}
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid onClick={() => null} xs={12} className={logo} item>
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
