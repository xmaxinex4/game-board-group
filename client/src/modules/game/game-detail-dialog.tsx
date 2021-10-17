import React from "react";

import { Dialog, DialogTitle } from "@mui/material";
import { LibraryGame } from "../library/types";

export interface GameDetailDialogProps {
  open: boolean;
  game?: LibraryGame;
  onClose: () => void;
}

export function GameDetailDialog(props: GameDetailDialogProps): React.ReactElement {
  const { open, game, onClose } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{game?.name}</DialogTitle>
    </Dialog>
  );
}
