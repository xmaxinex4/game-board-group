import React, { useContext } from "react";

import Icon from "@mdi/react";
import { mdiCancel, mdiContentSave } from "@mdi/js";

import { Button, Card, CardHeader, CardContent, Grid, Modal, Theme, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/styles";
import { makeStyles } from "@mui/styles";

// import { GameSearchTypeahead } from "./game-search-typeahead";
import { GameCircleListDisplay } from "./game-circle-list-display";
import { GamesStateContext } from "../../contexts/games-state-context";

export interface EditGamesModalProps {
  handleClose: () => void;
  loading?: boolean;
  onSave: (bggIds: string[]) => void;
  open: boolean;
  title?: string;
}

const useStyles = makeStyles({
  card: {
    padding: "24px",
    maxWidth: "500px",
    width: "500px"
  },

  div: {
    paddingTop: "50px",
    paddingBottom: "50px"
  },

  wrapper: {
    // margin: theme.spacing(1),
    position: 'relative',
  },

  buttonProgress: {
    // color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
});

export function EditGamesModal(props: EditGamesModalProps): React.ReactElement {
  const { handleClose, loading, onSave, open, title } = props;
  const classes = useStyles();

  const theme = useTheme<Theme>();

  const { games } = useContext(GamesStateContext);

  // const onGameDisplayDetailsError = React.useCallback(
  //   (error: ApolloError) => {
  //     // TODO: show errors in ui
  //     console.log("get game display details error: ", error);
  //   },
  //   []
  // );

  // const setNewGamesState = (data: { gameDetails: GameDisplayDetails }) => {
  //   const { gameDetails } = data;
  //   const newGamesState = gamesState.concat(gameDetails);

  //   setGamesState(newGamesState);
  // };

  // const [getGameDisplayDetails] = useLazyQuery<{ gameDetails: GameDisplayDetails }>(GAME_DISPLAY_DETAILS, {
  //   onError: onGameDisplayDetailsError,
  //   onCompleted: setNewGamesState
  // });

  // const onSelect = React.useCallback(
  //   (bggId: number) => {
  //     if (!gamesState.find(g => g.bggId === bggId)) {
  //       getGameDisplayDetails({ variables: { bggId } });
  //     } else {
  //       // TODO: Highlight game thats already in the collection display
  //       console.log("Already have that game in list");
  //     }
  //   },
  //   [gamesState]
  // );

  const onModalSave = React.useCallback(
    () => {
      onSave(games?.map((game) => game.bggId) || []);
    },
    [onSave, games]
  );

  const savedGames = React.useMemo(() => games, [games]);
  const onModalCancel = React.useCallback(
    () => {
      console.log("Modal Cancel, Delete added games");
      handleClose();
    },
    []
  );

  return (
    <Modal
      aria-labelledby="edit-games-modal"
      aria-describedby={title || "editing-games"}
      open={open}
      onClose={handleClose}
    >
      <Grid container justifyContent="center">
        <Grid item>
          <div className={classes.div}>
            <Card className={classes.card}>
              {title &&
                <CardHeader title={title} />
              }
              <CardContent>
                <Grid container direction="column" alignItems="center" spacing={8}>
                  <Grid item>
                    {/* <GameSearchTypeahead onSelect={onSelect} /> */}
                  </Grid>
                  <Grid item>
                    <GameCircleListDisplay />
                  </Grid>
                  <Grid container item justifyContent="space-between">
                    <Grid item className={classes.wrapper}>
                      <Button
                        variant="outlined"
                        color="primary"
                        disabled={loading}
                        startIcon={<Icon path={mdiContentSave} color={theme.palette.primary.main} size={0.5} />}
                        onClick={onModalSave}>
                        Save
                      </Button>
                      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        disabled={loading}
                        startIcon={<Icon path={mdiCancel} color={theme.palette.primary.main} size={0.5} />}
                        onClick={onModalCancel}>
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>
    </Modal>
  );
};