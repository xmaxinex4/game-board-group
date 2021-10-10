import React from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router";

import { AuthenticatedHomeRoutes } from "./home/routes";

import { NotFound } from "../error/not-found";

export function AuthenticatedRoutes(): React.ReactElement {
  return (
    <Switch>
      <Route exact path="/login" component={() => <Redirect to="/" />} />
      <Route path="/" component={AuthenticatedHomeRoutes} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}
