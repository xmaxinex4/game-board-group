/* eslint-disable no-nested-ternary */

import React, { useState } from "react";
import { Switch, Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";

import { ActiveUserGroupMembershipsResponse, ActiveUserResponse, UserPlayPreferenceResponse } from "../../src/types/types";

import { defaultTheme, getMuiTheme } from "./theme";
import { useApi } from "./hooks/useApi";
import { Page } from "./modules/common/layout/page";
import { AuthenticatedRoutes } from "./pages/authenticated/routes";
import { UnAuthenticatedRoutes } from "./pages/unauthenticated/routes";
import { selectActiveUser, setActiveUser } from "./redux/active-user-slice";
import { setActiveUserGroupMemberships, setSelectedActiveUserGroupMembershipId } from "./redux/active-user-group-memberships-slice";
import { setActiveUserPlayPreferences } from "./redux/active-user-play-preferences-slice";

function App() {
  const { apiGet } = useApi();
  const dispatch = useDispatch();

  const [isActiveGroupLoading, setIsActiveGroupLoading] = useState(true);
  const activeUser = useSelector(selectActiveUser);

  React.useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token && !activeUser) {
      apiGet<ActiveUserResponse>("/user/active-user").then(({ data }) => {
        dispatch(setActiveUser({
          user: data?.id ? data : undefined,
        }));
      });
    }
  }, [activeUser]);

  React.useEffect(() => {
    if (activeUser) {
      apiGet<ActiveUserGroupMembershipsResponse>("/user/active-user-group-memberships").then(({ data }) => {
        dispatch(setActiveUserGroupMemberships({
          groupMemberships: data?.groupMemberships,
        }));

        const selectedId = localStorage.getItem("gbg-selected-active-user-group-membership");
        const persistedIdInCurrentGroupMemberships = selectedId && data?.groupMemberships?.some((membership) => membership.id === selectedId);

        if (!persistedIdInCurrentGroupMemberships) {
          dispatch(setSelectedActiveUserGroupMembershipId({
            id: data?.groupMemberships?.[0]?.id,
          }));
        }
      }).finally(() => setIsActiveGroupLoading(false));

      apiGet<UserPlayPreferenceResponse[]>("/user/active-user-play-preferences").then(({ data }) => {
        dispatch(setActiveUserPlayPreferences({
          playPreferences: data,
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
                  <Route
                    path="*"
                    render={() => (
                      <AuthenticatedRoutes isActiveGroupLoading={isActiveGroupLoading} />
                    )}
                  />
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
