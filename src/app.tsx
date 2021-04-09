import React from "react";

import {
  Switch,
  Route,
} from "react-router-dom";

import { makeStyles } from "@material-ui/core";

import { useApi } from "./hooks/useApi";
import { User } from "./api-types/user";
import { Group } from "./api-types/group";

import { ActiveGroupContext } from "./contexts/active-group-context";
import { ActiveUserContext } from "./contexts/active-user-context";
import { AuthenticatedRoutes } from "./pages/authenticated/routes";
import { GameToolsRoutes } from "./pages/game-tools/routes";
import { UnAuthenticatedRoutes } from "./pages/unauthenticated/routes";

const useStyles = makeStyles((theme) => ({
  page: {
    paddingTop: `${theme.spacing(6)}px`,
    paddingBottom: `${theme.spacing(6)}px`,
  },
}));

function App() {
  document.body.style.margin = "0";

  const { page } = useStyles({});
  const { apiGet } = useApi();

  const [activeGroup, setActiveGroup] = React.useState<Group | undefined>(undefined);
  const [currentUser, setCurrentUser] = React.useState<User | undefined>(undefined);

  React.useEffect(() => {
    apiGet<User>("/user/me").then(({ data }) => {
      setCurrentUser(data || undefined);
      if (!activeGroup) {
        setActiveGroup(data?.groupMemberships?.[0]?.group);
      }
    });
  }, []);

  return (
    currentUser
      ? (
        <ActiveUserContext.Provider value={{ activeUser: currentUser }}>
          <ActiveGroupContext.Provider value={{ activeGroup, setActiveGroup }}>
            <Switch>
              <Route path="/game-tools" component={GameToolsRoutes} />
              <Route path="*" component={AuthenticatedRoutes} />
            </Switch>
          </ActiveGroupContext.Provider>
        </ActiveUserContext.Provider>
      )
      : (
        <div className={page}>
          <Switch>
            <Route path="/game-tools" component={GameToolsRoutes} />
            <Route path="*" component={UnAuthenticatedRoutes} />
          </Switch>
        </div>
      )
  );
}

export default App;
