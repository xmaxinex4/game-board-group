/* eslint-disable no-nested-ternary */

import React from "react";
import { Switch, Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";

import { defaultTheme, getMuiTheme } from "./theme";

import { useApi } from "./hooks/useApi";

import { Page } from "./modules/common/layout/page";

import { AuthenticatedRoutes } from "./pages/authenticated/routes";
import { UnAuthenticatedRoutes } from "./pages/unauthenticated/routes";
import { selectActiveUser, setActiveUser } from "./modules/user/redux/slice";
import { setActiveGroupId, setUserGroups } from "./modules/group/redux/slice";
import { MeUserResponse } from "./api-types/response-types";

function App() {
  const { apiGet } = useApi();
  const dispatch = useDispatch();

  const activeUser = useSelector(selectActiveUser);

  React.useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token && !activeUser) {
      apiGet<MeUserResponse>("/user/me").then(({ data }) => {
        dispatch(setActiveUser({
          user: data?.id ? data : undefined,
        }));

        dispatch(setActiveGroupId({
          id: data?.groupMemberships?.[0]?.group?.id,
        }));

        dispatch(setUserGroups({
          groups: data?.groupMemberships?.map((groupMembership) => groupMembership.group),
        }));
      });
    }
  }, [activeUser]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <Page>
          {activeUser
            ? (
              <ThemeProvider theme={getMuiTheme(activeUser.color)}>
                <Switch>
                  <Route path="*" component={AuthenticatedRoutes} />
                </Switch>
              </ThemeProvider>
            )
            : (
              <Switch>
                <Route path="*" component={UnAuthenticatedRoutes} />
              </Switch>
            )}
        </Page>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
