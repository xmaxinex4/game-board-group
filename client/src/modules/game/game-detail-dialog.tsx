import React from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";

import { LibraryGame } from "../../../../src/types/types";
import { UserCircleListDisplay } from "../user/user-circle-list-display";

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
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography>Owners:</Typography>
          </Grid>
          <Grid item>
            {game?.owners && (
              <UserCircleListDisplay verticalNames users={game?.owners} />
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
