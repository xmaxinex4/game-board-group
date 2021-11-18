import React, { useCallback } from "react";

import CloseIcon from "@mui/icons-material/Close";

import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { LibraryGame } from "../../../../src/types/types";
import { BggGameDetailDisplay } from "./bgg-game-detail-display";
import { PageLoadingSpinner } from "../common/progress/page-loading-spinner";

export interface GameDetailDialogProps {
  open: boolean;
  game?: LibraryGame;
  onClose: () => void;
}

export function GameDetailDialog(props: GameDetailDialogProps): React.ReactElement {
  const { open, game, onClose } = props;
  const theme = useTheme<Theme>();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const onCloseGameDialog = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Dialog
      scroll="paper"
      onClose={onCloseGameDialog}
      open={open}
      sx={{
        ".MuiDialog-container": {
          marginTop: "32px",
          height: "unset",
        },
        ".MuiDialog-paper": {
          maxHeight: {
            xs: "475px",
            md: "750px",
          },
        },
      }}
    >
      <DialogTitle>
        <Grid container alignItems="center" justifyContent="space-between">
          {game?.gameDetails?.gameType !== "boardgameexpansion" && (
            <Grid item xs={11}>
              <Typography noWrap variant={isSmDown ? "body1" : "h6"}>
                {game?.name}
              </Typography>
            </Grid>
          )}
          {game?.gameDetails?.gameType === "boardgameexpansion" && (
            <>
              <Grid item sx={{ paddingRight: "8px" }}>
                <Chip
                  size="small"
                  label="Expansion"
                />
              </Grid>
              <Grid item xs={6} sm={8} md={9}>
                <Typography noWrap variant={isSmDown ? "body1" : "h6"}>{game?.name}</Typography>
              </Grid>
            </>
          )}
          <Grid item xs={1} sx={{ marginLeft: { xs: "auto" } }}>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        {!game && (
          <PageLoadingSpinner />
        )}
        {game && (
          <BggGameDetailDisplay game={game} />
        )}
      </DialogContent>
    </Dialog>
  );
}
