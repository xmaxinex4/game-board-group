import React from "react";

import { Game } from ".prisma/client";

export interface GamesStateContextProps {
  games?: Pick<Game, "bggId" | "name" | "urlThumb" | "urlImage" | "year">[];
  setGames?: React.Dispatch<React.SetStateAction<Pick<Game, "bggId" | "name" | "urlThumb" | "urlImage" | "year">[]>>;
}

export const GamesStateContext = React.createContext<GamesStateContextProps>({ games: [], setGames: undefined });
