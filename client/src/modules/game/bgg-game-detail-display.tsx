import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import MinAgeIcon from "@mui/icons-material/CakeTwoTone";
import TimeIcon from "@mui/icons-material/AccessTimeTwoTone";
import PlayerCountIcon from "@mui/icons-material/GroupTwoTone";

import {
  Card,
  Grid,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { GameDetails, LibraryGame } from "../../../../src/types/types";
import { getExpandedGameDetailsFromBggXmlResult } from "../../helpers/bgg-game-details-xml-to-json";
import { useBggApi } from "../../hooks/useBggApi";
import { UserCircleListDisplay } from "../user/user-circle-list-display";
import { PageLoadingSpinner } from "../common/progress/page-loading-spinner";

import { BggGameDetailAccordionDisplay } from "./bgg-game-detail-accordion-display";
import { PlayPreferenceRating } from "./user-game-play-preference/play-preference-rating";
import { GameComplexityRating } from "./game-complexity-rating";

export interface BggGameDetailDisplayProps {
  game: LibraryGame;
}

export function BggGameDetailDisplay(props: BggGameDetailDisplayProps): React.ReactElement {
  const { game } = props;
  const theme = useTheme<Theme>();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

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

  const playTimeDisplay = useMemo(() => {
    if (!gameDetails?.minPlayTime) {
      return null;
    }

    const minPlayTimeDisplay = gameDetails?.minPlayTime && gameDetails.minPlayTime >= 60
      ? `${Math.round(gameDetails?.minPlayTime / 60)} hr`
      : `${gameDetails?.minPlayTime} min`;

    if (gameDetails?.maxPlayTime && (gameDetails?.minPlayTime !== gameDetails?.maxPlayTime)) {
      const maxPlayTimeDisplay = gameDetails?.maxPlayTime && gameDetails.maxPlayTime >= 60
        ? `${Math.round(gameDetails?.maxPlayTime / 60)} hr`
        : `${gameDetails?.maxPlayTime} min`;

      return minPlayTimeDisplay === maxPlayTimeDisplay
        ? minPlayTimeDisplay
        : `${minPlayTimeDisplay} - ${maxPlayTimeDisplay}`;
    }

    return minPlayTimeDisplay;
  }, [gameDetails]);

  return (
    <>
      {gameDetails === undefined && (
        <PageLoadingSpinner />
      )}
      {gameDetails === null && (
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography>Owners:</Typography>
          </Grid>
          <Grid item>
            {game?.owners && (
              <UserCircleListDisplay useLetterAvatars={!isSmUp} users={game?.owners} />
            )}
          </Grid>
        </Grid>
      )}
      {gameDetails && (
        <Grid container direction="column" justifyContent="center" spacing={2}>
          <Grid container item direction="column" alignItems="center" spacing={1}>
            <Grid item>
              <Typography>Owners:</Typography>
            </Grid>
            <Grid item>
              {game?.owners && (
                <UserCircleListDisplay useLetterAvatars={!isSmUp} users={game?.owners} />
              )}
            </Grid>
          </Grid>
          <Grid item>
            <PlayPreferenceRating bggId={game.bggId} />
          </Grid>
          <Grid item>
            <Card sx={{ padding: "16px" }}>
              <Grid container alignItems="center" justifyContent="space-evenly">
                <Grid
                  item
                  sx={{
                    padding: {
                      xs: "8px",
                      sm: "unset",
                    },
                  }}
                >
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
                    {playTimeDisplay && (
                      <Grid container item alignItems="center" spacing={1}>
                        <Grid item><TimeIcon color="primary" /></Grid>
                        <Grid item>
                          <Typography>{playTimeDisplay}</Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {!!gameDetails.complexity && (
                  <Grid
                    item
                    sx={{
                      padding: {
                        xs: "8px",
                        sm: "unset",
                      },
                    }}
                  >
                    <GameComplexityRating complexity={gameDetails.complexity} />
                  </Grid>
                )}
              </Grid>
            </Card>
          </Grid>
          {isSmUp && (
            <Grid item>
              <BggGameDetailAccordionDisplay
                gameDescription={decodedGameDescription}
                designers={gameDetails?.designers}
                artists={gameDetails?.artists}
                publishers={gameDetails?.publishers}
              />
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
}
