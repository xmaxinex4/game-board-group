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

  return (
    <Switch>
      <Route exact path="/login" component={() => <Redirect to="/" />} />
      <Route path="/" component={() => <AuthenticatedHomeRoutes isActiveGroupLoading={isActiveGroupLoading} />} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}
