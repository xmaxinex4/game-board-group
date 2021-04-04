import * as React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

import { ThemeProvider } from '@material-ui/styles';

import { muiTheme } from './theme';
import { ApiContext, apiGet, apiPost } from './contexts/api-context';


export const AppProvider: React.FunctionComponent = ({ children }) => {
  const browserHistory = createBrowserHistory();
  return (
    <ThemeProvider theme={muiTheme}>
      <ApiContext.Provider value={{ apiGet, apiPost }}>
        <Router history={browserHistory}>
          {children}
        </Router>
      </ApiContext.Provider>
    </ThemeProvider>
  )
};
