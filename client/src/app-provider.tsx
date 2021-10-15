import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { PageLoadingSpinner } from "./modules/common/progress/page-loading-spinner";

import { persistor, store } from "./redux/store";

export function AppProvider(props: { children: React.ReactNode; }): React.ReactElement {
  const { children } = props;
  return (
    <Provider store={store}>
      <PersistGate loading={<PageLoadingSpinner />} persistor={persistor}>
        <Router>
          {children}
        </Router>
      </PersistGate>
    </Provider>
  );
}
