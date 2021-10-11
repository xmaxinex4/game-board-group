import React from "react";

import Icon from "@mdi/react";
import { mdiContentSave } from "@mdi/js";
import CloseIcon from "@mui/icons-material/Close";

import {
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  ModalProps,
  Typography,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { GameCircleListDisplay } from "./game-circle-list-display";
import { GameSearchTypeahead } from "./game-search-typeahead";
import { Game } from "../../api-types/game";

const useStyles = makeStyles({
  card: {
    padding: "24px",
    maxWidth: "500px",
    width: "500px",
  },

  div: {
    paddingTop: "50px",
    paddingBottom: "50px",
  },
});

export interface AddGamesModalProps extends Pick<ModalProps, "open"> {
  closeModal: () => void;
  games: Game[];
  setGames: React.Dispatch<React.SetStateAction<Game[]>>;
}

export function AddGamesModal(props: AddGamesModalProps): React.ReactElement {
  const {
    games,
    setGames,
    open,
    closeModal,
  } = props;

  const { card, div } = useStyles();

  const onModalCancel = React.useCallback(
    () => {
      closeModal();
    },
    [closeModal],
  );

  const onModalSave = React.useCallback(
    () => {
      console.log("Save modal");
    },
    [],
  );

  return (
    <Modal
      aria-labelledby="add-games-modal"
      aria-describedby="adding-games"
      open={open}
      onClose={closeModal}
    >
      <Grid container item justifyContent="center">
        <div className={div}>
          <Card className={card}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6">Add Game</Typography>
              </Grid>
              <Grid item>
                <IconButton size="large" onClick={onModalCancel}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
            <CardContent>
              <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Grid item>
                  <GameSearchTypeahead games={games} setGames={setGames} />
                </Grid>
                <Grid item>
                  <GameCircleListDisplay games={games} />
                </Grid>
                <Grid item>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<Icon path={mdiContentSave} size={0.5} />}
                    onClick={onModalSave}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </Modal>
  );
}
