import React from "react";
import { useRouteMatch } from "react-router";

import ChevronLeft from "@mui/icons-material/ChevronLeft";

import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";

import { GameToolsLink } from "./game-tools-link";
import { SiteLink } from "./site-link";

export function UnauthenticatedNavBar(): React.ReactElement {
  const isLoginRoute = useRouteMatch("/login");
  const isCreateUserRoute = useRouteMatch("/create-account");

  return (
    <Grid container>
      <AppBar position="static" sx={{ background: "transparent", boxShadow: "none" }}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            {!(isLoginRoute || isCreateUserRoute) && (
              <Grid item>
                <Typography>
                  <SiteLink icon={ChevronLeft} text="Login" to="/" />
                </Typography>
              </Grid>
            )}
            <Grid item sx={{ marginLeft: "auto" }}>
              <GameToolsLink />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
