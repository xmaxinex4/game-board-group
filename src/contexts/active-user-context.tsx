import * as React from "react";
import { User } from "../api-types/user";

export interface ActiveUserContext {
  activeUser?: User;
}

export const ActiveUserContext = React.createContext<ActiveUserContext>({ activeUser: undefined });