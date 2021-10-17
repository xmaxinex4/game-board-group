import { Game, User } from ".prisma/client";

export interface LibraryGame extends Game {
  copies: number;
  owners: User[];
}