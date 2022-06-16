import React from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router";

import { AuthenticatedHomeRoutes } from "./home-routes";

import { NotFound } from "../error/not-found";

export interface AuthenticatedRoutesProps {
  isActiveGroupLoading?: boolean;
}

export function AuthenticatedRoutes(props: AuthenticatedRoutesProps): React.ReactElement {
  const { isActiveGroupLoading } = props;

  const loginRedirectRouteComponent = () => <Redirect to="/" />;
  const authenticatedHomeRouteComponent = () => <AuthenticatedHomeRoutes isActiveGroupLoading={isActiveGroupLoading} />;

  return (
    <Switch>
      <Route exact path="/login" component={loginRedirectRouteComponent} />
      <Route path="/" component={authenticatedHomeRouteComponent} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}
