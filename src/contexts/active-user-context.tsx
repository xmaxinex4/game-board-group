import * as React from "react";
import { CurrentUser } from "../modules/user/Types";

export interface ActiveUserContext {
  activeUser: CurrentUser;
}

export const ActiveUserContext = React.createContext<ActiveUserContext>({ activeUser: undefined });