import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
// import { useSelector } from "react-redux";

import MinAgeIcon from "@mui/icons-material/CakeTwoTone";
import TimeIcon from "@mui/icons-material/AccessTimeTwoTone";
import PlayerCountIcon from "@mui/icons-material/GroupTwoTone";

import {
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import { GameDetails, LibraryGame } from "../../../../src/types/types";

import { useBggApi } from "../../hooks/useBggApi";

import { UserCircleListDisplay } from "../user/user-circle-list-display";
import { getExpandedGameDetailsFromBggXmlResult } from "../../helpers/bgg-game-details-xml-to-json";
// import { selectActiveUser } from "../../redux/active-user-slice";

import { BggGameDetailAccordionDisplay } from "./bgg-game-detail-accordion-display";
import { PlayPreferenceRating } from "./user-game-play-preference/play-preference-rating";

export interface BggGameDetailDisplayProps {
  game: LibraryGame;
}

export function BggGameDetailDisplay(props: BggGameDetailDisplayProps): React.ReactElement {
  const { game } = props;

  // const activeUser = useSelector(selectActiveUser);
  // const activeUserPlayPreference = useMemo(() => activeUser?.playPreferences?.find((preference) => preference.game.bggId === game.bggId), []);

  const [gameDetails, setGameDetails] = useState<GameDetails | null>();
  const { bggApiGet } = useBggApi();

  const getGameDetails = useCallback(async () => {
    const { data } = await bggApiGet(`/thing?id=${game.bggId}&stats=1`);

    if (data as string) {
      const result = getExpandedGameDetailsFromBggXmlResult(data as string);
      setGameDetails(result);
    }
  }, [setGameDetails]);

  useEffect(() => {
    getGameDetails();
  }, []); // run once on component load

  const decodedGameDescription = useMemo(() => {
    const encodedDescription = document.createElement("div");
    encodedDescription.innerHTML = gameDetails?.description || "";
    return encodedDescription.textContent || undefined;
  }, [gameDetails]);

  return (
    <>
      {gameDetails === undefined && (
        <CircularProgress />
      )}
      {gameDetails === null && (
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography>Owners:</Typography>
          </Grid>
          <Grid item>
            {game?.owners && (
              <UserCircleListDisplay users={game?.owners} />
            )}
          </Grid>
        </Grid>
      )}
      {gameDetails && (
        <Grid container direction="column" spacing={2}>
          <Grid container item alignItems="center" spacing={1}>
            <Grid item>
              <Typography>Owned By:</Typography>
            </Grid>
            <Grid item>
              {game?.owners && (
                <UserCircleListDisplay users={game?.owners} />
              )}
            </Grid>
          </Grid>
          <Grid item>
            <PlayPreferenceRating bggId={game.bggId} />
          </Grid>
          <Grid item>
            <Card sx={{ padding: "16px" }}>
              <Grid container direction="column" spacing={1}>
                <Grid container item alignItems="center" spacing={1}>
                  <Grid item><MinAgeIcon color="primary" /></Grid>
                  <Grid item><Typography>{`Ages ${gameDetails.minAge}+`}</Typography></Grid>
                </Grid>
                {!!gameDetails.minPlayers && (
                  <Grid container item alignItems="center" spacing={1}>
                    <Grid item><PlayerCountIcon color="primary" /></Grid>
                    <Grid item>
                      {!!gameDetails.maxPlayers && (
                        gameDetails.minPlayers === gameDetails.maxPlayers
                          ? (
                            <Typography>{`${gameDetails.minPlayers} Player(s)`}</Typography>
                          )
                          : (
                            <Typography>{`${gameDetails.minPlayers}-${gameDetails.maxPlayers} Players`}</Typography>
                          )
                      )}
                      {!gameDetails.maxPlayers && (
                        <Typography>{`${gameDetails.minPlayers} Player(s)`}</Typography>
                      )}
                    </Grid>
                  </Grid>
                )}
                <Grid container item alignItems="center" spacing={1}>
                  <Grid item><TimeIcon color="primary" /></Grid>
                  <Grid item>
                    <Typography>{`${gameDetails.minPlayTime}-${gameDetails.maxPlayTime} min`}</Typography>
                  </Grid>
                </Grid>
                {/* <Grid item><Typography>Complexity</Typography></Grid> */}
              </Grid>
            </Card>
          </Grid>
          <Grid item>
            <BggGameDetailAccordionDisplay
              gameDescription={decodedGameDescription}
              designers={gameDetails?.designers}
              artists={gameDetails?.artists}
              publishers={gameDetails?.publishers}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
