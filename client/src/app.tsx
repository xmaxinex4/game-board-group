/* eslint-disable no-nested-ternary */

import React, { useState } from "react";
import { Switch, Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@mui/material";

import { defaultTheme, getMuiTheme } from "./theme";

import { useApi } from "./hooks/useApi";

import { Page } from "./modules/common/layout/page";

import { AuthenticatedRoutes } from "./pages/authenticated/routes";
import { UnAuthenticatedRoutes } from "./pages/unauthenticated/routes";
import { PageLoadingSpinner } from "./modules/common/progress/page-loading-spinner";
import { selectActiveUser, setActiveUser } from "./modules/user/redux/slice";
import { setActiveGroupId, setUserGroups } from "./modules/group/redux/slice";
import { UserMeResponse } from "./api-types/response-types";

function App() {
  const { apiGet } = useApi();
  const dispatch = useDispatch();

  const [userTheme, setUserTheme] = useState<Theme>(defaultTheme);
  const [isLoading, setIsLoading] = useState(true);

  const activeUser = useSelector(selectActiveUser);

  React.useEffect(() => {
    apiGet<UserMeResponse>("/user/me").then(({ data }) => {
      dispatch(setActiveUser({
        user: data?.id ? data : undefined,
      }));

      dispatch(setActiveGroupId({
        id: data?.groupMemberships?.[0]?.group?.id,
      }));

      dispatch(setUserGroups({
        groups: data?.groupMemberships?.map((groupMembership) => groupMembership.group),
      }));

      setUserTheme(data?.color ? getMuiTheme(data.color) : defaultTheme);
    }).finally(() => setIsLoading(false));
  }, []); // empty array to run effect and clean it up only once (on mount and unmount), don't rerun

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={userTheme}>
        <Page>
          {
            isLoading
              ? (
                <PageLoadingSpinner />
              )
              : activeUser
                ? (
                  <Switch>
                    <Route path="*" component={AuthenticatedRoutes} />
                  </Switch>
                )
                : (
                  <Switch>
                    <Route path="*" component={UnAuthenticatedRoutes} />
                  </Switch>
                )
          }
        </Page>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
