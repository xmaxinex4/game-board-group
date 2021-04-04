import * as React from "react";
import { Group } from "../api-types/group";

export interface ActiveGroupContext {
  activeGroup?: Group;
  setActiveGroup?: React.Dispatch<React.SetStateAction<Group>>;
}

export const ActiveGroupContext = React.createContext<ActiveGroupContext>({ activeGroup: undefined, setActiveGroup: undefined });