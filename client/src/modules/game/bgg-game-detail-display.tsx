import React, { useMemo } from "react";

import MinAgeIcon from "@mui/icons-material/CakeTwoTone";
import TimeIcon from "@mui/icons-material/AccessTimeTwoTone";
import PlayerCountIcon from "@mui/icons-material/GroupTwoTone";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";

import {
  Card,
  Grid,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
  Link,
} from "@mui/material";

import { LibraryGame } from "../../../../src/types/types";

import { UserCircleListDisplay } from "../user/user-circle-list-display";
import { BggGameDetailAccordionDisplay } from "./bgg-game-detail-accordion-display";
import { PlayPreferenceRating } from "./user-game-play-preference/play-preference-rating";
import { GameComplexityRating } from "./game-complexity-rating";

export interface BggGameDetailDisplayProps {
  game: LibraryGame;
}

export function BggGameDetailDisplay(props: BggGameDetailDisplayProps): React.ReactElement {
  const { game } = props;

  const {
    description,
    minPlayTime,
    maxPlayTime,
    minAge,
    minPlayers,
    maxPlayers,
    complexity,
    designers,
    artists,
    publishers,
    categories,
    mechanics,
  } = game.gameDetails || {};

  const theme = useTheme<Theme>();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const decodedGameDescription = useMemo(() => {
    const encodedDescription = document.createElement("div");
    encodedDescription.innerHTML = description || "";
    return encodedDescription.textContent || undefined;
  }, [description]);

  const playTimeDisplay = useMemo(() => {
    if (!minPlayTime) {
      return null;
    }

    let minPlayTimeDisplay;
    if (minPlayTime) {
      minPlayTimeDisplay = minPlayTime >= 60
        ? `${Math.round(minPlayTime / 60)} hr`
        : `${minPlayTime} min`;
    }

    if (maxPlayTime && (minPlayTime !== maxPlayTime)) {
      const maxPlayTimeDisplay = maxPlayTime >= 60
        ? `${Math.round(maxPlayTime / 60)} hr`
        : `${maxPlayTime} min`;

      return minPlayTimeDisplay === maxPlayTimeDisplay
        ? minPlayTimeDisplay
        : `${minPlayTimeDisplay} - ${maxPlayTimeDisplay}`;
    }

    return minPlayTimeDisplay;
  }, [minPlayTime, maxPlayTime]);

  return (
    <>
      {!game?.gameDetails && (
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography>Owners:</Typography>
          </Grid>
          <Grid item>
            {game?.owners && (
              <UserCircleListDisplay useLetterAvatars={!isMdUp} users={game?.owners} />
            )}
          </Grid>
        </Grid>
      )}
      {game?.gameDetails && (
        <Grid container direction="column" justifyContent="center" spacing={2}>
          <Grid container item direction="column" alignItems="center" spacing={1}>
            <Grid item>
              <Typography>Owners:</Typography>
            </Grid>
            <Grid item>
              {game?.owners && (
                <UserCircleListDisplay useLetterAvatars={!isMdUp} users={game?.owners} />
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
                    {!!minAge && (
                      <Grid container item alignItems="center" spacing={1}>
                        <Grid item><MinAgeIcon color="primary" /></Grid>
                        <Grid item><Typography>{`Ages ${minAge}+`}</Typography></Grid>
                      </Grid>
                    )}
                    {!!minPlayers && (
                      <Grid container item alignItems="center" spacing={1}>
                        <Grid item><PlayerCountIcon color="primary" /></Grid>
                        <Grid item>
                          {!!maxPlayers && (
                            minPlayers === maxPlayers
                              ? (
                                <Typography>{`${minPlayers} Player(s)`}</Typography>
                              )
                              : (
                                <Typography>{`${minPlayers}-${maxPlayers} Players`}</Typography>
                              )
                          )}
                          {!maxPlayers && (
                            <Typography>{`${minPlayers} Player(s)`}</Typography>
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
                    {!!game.year && (
                      <Grid container item alignItems="center" spacing={1}>
                        <Grid item><CalendarIcon color="primary" /></Grid>
                        <Grid item><Typography>{game.year}</Typography></Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {!!complexity && (
                  <Grid
                    item
                    sx={{
                      padding: {
                        xs: "16px",
                        md: "unset",
                      },
                    }}
                  >
                    <GameComplexityRating complexity={complexity} />
                  </Grid>
                )}
              </Grid>
            </Card>
          </Grid>
          {isMdUp && (
            <Grid item>
              <BggGameDetailAccordionDisplay
                mechanics={mechanics}
                categories={categories}
                gameDescription={decodedGameDescription}
                designers={designers}
                artists={artists}
                publishers={publishers}
              />
            </Grid>
          )}
          <Grid item container alignItems="center" justifyContent="flex-end" spacing={0.5}>
            <Grid item>
              <Typography color="GrayText" variant="caption">
                Data Collected From
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                <Link href="https://boardgamegeek.com/">
                  BoardGameGeek
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}
