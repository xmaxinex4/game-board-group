import React, { useCallback, useState } from "react";

import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {
  CardContent,
  Fab,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

import { MeepleCircleSiteNameInline } from "../../images/components/meeple-circle-site-name-inline";

import { Login } from "./login";
import { CreateAccount } from "./create-account";
import { ForgotPassword } from "./forgot-password";

const useStyles = makeStyles((theme) => ({
  gameToolsButtonLink: {
    top: "auto",
    bottom: 0,
    right: 0,
    position: "fixed",
    padding: `${theme.spacing(2)}px`,
  },
}));

export function UnAuthenticatedRoutes(): React.ReactElement {
  const { gameToolsButtonLink } = useStyles({});

  const [isGameToolsButtonExtended, setIsGameToolsButtonExtended] = useState(false);

  const extendGameToolsButton = useCallback(() => {
    setIsGameToolsButtonExtended(true);
  }, [setIsGameToolsButtonExtended]);

  const collapseGameToolsButton = useCallback(() => {
    setIsGameToolsButtonExtended(false);
  }, [setIsGameToolsButtonExtended]);

  return (
    <>
      <div className={gameToolsButtonLink}>
        <Fab
          onMouseEnter={extendGameToolsButton}
          onMouseLeave={collapseGameToolsButton}
          color="primary"
          href="/game-tools"
          size="large"
          variant={isGameToolsButtonExtended ? "extended" : "round"}
        >
          <SettingsIcon />
          {
            isGameToolsButtonExtended && (
              <Typography>Try Our Free Game Tools</Typography>
            )
          }
        </Fab>
      </div>
      <Grid container direction="column" alignItems="center" justify="center" spacing={2}>
        <Grid item>
          <MeepleCircleSiteNameInline />
        </Grid>
        <Grid item>
          <CardContent>
            <Switch>
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/create-account" component={CreateAccount} />
              <Route path="/login" component={Login} />
              <Route exact path="*" component={() => <Redirect to="/login" />} />
            </Switch>
          </CardContent>
        </Grid>
      </Grid>
    </>
  );
}
