import React from "react";
import { Router } from "react-router";
import { createBrowserHistory } from "history";

import { ThemeProvider } from "@material-ui/styles";

import { muiTheme } from "./theme";

export function AppProvider(props: { children: React.ReactNode; }): React.ReactElement {
  const { children } = props;
  const browserHistory = createBrowserHistory();
  return (
    <ThemeProvider theme={muiTheme}>
      <Router history={browserHistory}>
        {children}
      </Router>
    </ThemeProvider>
  );
}
