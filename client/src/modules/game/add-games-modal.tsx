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
  Theme,
  CardActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { GameCircleListDisplay } from "./game-circle-list-display";
import { GameSearchTypeahead } from "./game-search-typeahead";
import { Game } from "../../api-types/game";

const useStyles = makeStyles<Theme>((theme) => ({
  card: {
    padding: theme.spacing(3),
    minWidth: "250px",
    width: "600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    maxHeight: "500px",
    minHeight: "500px",
    padding: "50px",
    paddingTop: "75px",
  },
  saveButton: {
    marginLeft: "auto",
  },
}));

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

  const { card, modal, saveButton } = useStyles();

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
      className={modal}
    >
      <Card className={card}>
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid container item alignItems="center">
              <Grid item xs={11}>
                <Typography style={{ paddingLeft: "8px", paddingTop: "8px" }} variant="h6">Add Game</Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton size="large" onClick={onModalCancel}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Grid item>
                  <GameSearchTypeahead games={games} setGames={setGames} />
                </Grid>
                <Grid item>
                  <GameCircleListDisplay games={games} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            className={saveButton}
            variant="contained"
            color="primary"
            startIcon={<Icon path={mdiContentSave} size={0.5} />}
            onClick={onModalSave}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}
