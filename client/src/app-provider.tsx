import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import store from "./redux/store";

export function AppProvider(props: { children: React.ReactNode; }): React.ReactElement {
  const { children } = props;
  return (
    <Provider store={store}>
      <Router>
        {children}
      </Router>
    </Provider>
  );
}
