import React, { useCallback } from "react";

import CloseIcon from "@mui/icons-material/Close";

import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
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

  const onCloseGameDialog = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Dialog maxWidth="lg" onClose={onCloseGameDialog} open={open}>
      <DialogTitle>
        <Grid container alignItems="stretch" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">
              {game?.name}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
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
