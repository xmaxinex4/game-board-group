import * as React from "react";
import { CurrentUserGroup } from "../Queries";

export interface ActiveGroupContext {
  activeGroup?: CurrentUserGroup;
  setActiveGroup?: React.Dispatch<React.SetStateAction<CurrentUserGroup>>;
}

export const ActiveGroupContext = React.createContext<ActiveGroupContext>({ activeGroup: undefined, setActiveGroup: undefined });