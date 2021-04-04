import { GameData } from "../game/Types";

export interface CollectionOwner {
  id: string;
  username: string;
  color: string;
}

export interface CollectionDetails {
  id: string;
  name: string;
  games: GameData[];
  owners: CollectionOwner[];
}