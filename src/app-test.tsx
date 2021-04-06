import React from "react";
import { useLocation } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router";

import {
  Card,
  CardContent,
  Grid,
  makeStyles,
} from "@material-ui/core";

import { useApi } from "./hooks/useApi";

import { Login } from "./pages/login";
import { CreateAccount } from "./pages/create-account";
import { ForgotPassword } from "./pages/forgot-password";
import { Backsplash } from "./modules/common/backsplash/backsplash";

import { MeepleCircleSiteNameInline } from "./images/components/meeple-circle-site-name-inline";
import { User } from "./api-types/user";
import { Group } from "./api-types/group";

import { Home } from "./pages/home";
import { Account } from "./pages/account";
import { NotFound } from "./pages/not-found";
import { ActiveGroupContext } from "./contexts/active-group-context";
import { ActiveUserContext } from "./contexts/active-user-context";

const useStyles = makeStyles({
  card: {
    padding: "24px",
    maxWidth: "500px",
    width: "500px",
  },

  div: {
    paddingTop: "50px",
    paddingBottom: "50px",
  },

  linearProgress: {
    flexGrow: 1,
  },
});

function App() {
  document.body.style.margin = "0";

  const classes = useStyles({});
  const location = useLocation();

  const { apiGet } = useApi();

  const [activeGroup, setActiveGroup] = React.useState<Group | undefined>(undefined);
  const [currentUser, setCurrentUser] = React.useState<User | undefined>(undefined);

  React.useEffect(() => {
    apiGet<{ me: User; }>("user/me").then(({ data }) => {
      setCurrentUser(data?.me);
      if (!activeGroup) {
        setActiveGroup(data?.me?.groupMemberships?.[0]?.group);
      }
    });
  }, []);

  return (
    currentUser
      ? (
        <ActiveUserContext.Provider value={{ activeUser: currentUser }}>
          <ActiveGroupContext.Provider value={{ activeGroup, setActiveGroup }}>
            <Switch>
              <Route exact path="/login" component={() => <Redirect to="/" />} />
              <Route exact path="/not-found" component={NotFound} />
              <Route path="/account" component={Account} />
              <Route path="/" component={Home} />
            </Switch>
          </ActiveGroupContext.Provider>
        </ActiveUserContext.Provider>
      )
      : (
        <Backsplash>
          <div className={classes.div}>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <MeepleCircleSiteNameInline />
              </Grid>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent>
                    <Switch>
                      <Route path="/forgot-password" component={ForgotPassword} />
                      <Route path="/create-account" component={CreateAccount} />
                      <Route path="/login" component={Login} />
                      <Route exact path="*">
                        <Redirect to={{
                          pathname: "/login",
                          state: { from: location },
                        }}
                        />
                      </Route>
                    </Switch>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Backsplash>
      )
  );
}

export default App;
