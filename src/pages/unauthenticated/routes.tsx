import React, { useCallback, useMemo, useState } from "react";

import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {
  CardContent,
  Fab,
  Grid,
  Typography,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

import { MeepleCircleSiteNameInline } from "../../images/components/meeple-circle-site-name-inline";

import { FloatingPageContent, FloatingPageContentStyleProps } from "../../modules/common/layout/floating-page-content";

import { Login } from "./login";
import { CreateAccount } from "./create-account";
import { ForgotPassword } from "./forgot-password";

export function UnAuthenticatedRoutes(): React.ReactElement {
  const [isGameToolsButtonExtended, setIsGameToolsButtonExtended] = useState(false);

  const extendGameToolsButton = useCallback(() => {
    setIsGameToolsButtonExtended(true);
  }, [setIsGameToolsButtonExtended]);

  const collapseGameToolsButton = useCallback(() => {
    setIsGameToolsButtonExtended(false);
  }, [setIsGameToolsButtonExtended]);

  const floatingContentStyleProps: FloatingPageContentStyleProps = useMemo(() => ({
    position: "bottom-right",
  }), []);

  return (
    <>
      <FloatingPageContent styleProps={floatingContentStyleProps}>
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
      </FloatingPageContent>
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
