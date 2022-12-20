import React from "react";
import { GameResponse } from "../../../src/types/types";

export interface GamesStateContextProps {
  games?: GameResponse[];
  setGames?: React.Dispatch<React.SetStateAction<GameResponse[]>>;
}

export const GamesStateContext = React.createContext<GamesStateContextProps>({ games: [], setGames: undefined });
