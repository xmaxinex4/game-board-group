import React from "react";
import { Switch, Route } from "react-router-dom";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@mui/material";

import { defaultTheme, getMuiTheme } from "./theme";
import { useApi } from "./hooks/useApi";

import { User } from "./api-types/user";
import { Group } from "./api-types/group";

import { ActiveGroupContext } from "./contexts/active-group-context";
import { ActiveUserContext } from "./contexts/active-user-context";

import { Page } from "./modules/common/layout/page";

import { AuthenticatedRoutes } from "./pages/authenticated/routes";
import { UnAuthenticatedRoutes } from "./pages/unauthenticated/routes";

function App() {
  const { apiGet } = useApi();

  const [activeGroup, setActiveGroup] = React.useState<Group | undefined>(undefined);
  const [currentUser, setCurrentUser] = React.useState<User | undefined>(undefined);
  const [userTheme, setUserTheme] = React.useState<Theme>(defaultTheme);

  React.useEffect(() => {
    apiGet<User>("/user/me").then(({ data }) => {
      setCurrentUser(data?.id ? data : undefined);
      setUserTheme(data?.color ? getMuiTheme(data.color) : defaultTheme);
      if (!activeGroup) {
        setActiveGroup(data?.groupMemberships?.[0]?.group);
      }
    });
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={userTheme}>
        <Page>
          {
            currentUser
              ? (
                <ActiveUserContext.Provider value={{ activeUser: currentUser }}>
                  <ActiveGroupContext.Provider value={{ activeGroup, setActiveGroup }}>
                    <Switch>
                      <Route path="*" component={AuthenticatedRoutes} />
                    </Switch>
                  </ActiveGroupContext.Provider>
                </ActiveUserContext.Provider>
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
