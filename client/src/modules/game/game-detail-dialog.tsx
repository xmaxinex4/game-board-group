import React from "react";

import {
  CircularProgress,
  Dialog,
  DialogContent,
  // DialogTitle,
} from "@mui/material";

import { LibraryGame } from "../../../../src/types/types";
import { BggGameDetailDisplay } from "./bgg-game-detail-display";

export interface GameDetailDialogProps {
  open: boolean;
  game?: LibraryGame;
  onClose: () => void;
}

export function GameDetailDialog(props: GameDetailDialogProps): React.ReactElement {
  const { open, game, onClose } = props;

  return (
    <Dialog maxWidth="lg" onClose={onClose} open={open}>
      <DialogContent sx={{ width: "800px" }}>
        {!game && (
          <CircularProgress />
        )}
        {game && (
          <BggGameDetailDisplay game={game} />
        )}
      </DialogContent>
    </Dialog>
  );
}
