import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

export function AppProvider(props: { children: React.ReactNode; }): React.ReactElement {
  const { children } = props;
  return (
    <Router>
      {children}
    </Router>
  );
}
