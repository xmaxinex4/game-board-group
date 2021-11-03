import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSelector } from "react-redux";

import ExpandMoreIcon from "@mui/icons-material/ExpandMoreTwoTone";
import MinAgeIcon from "@mui/icons-material/CakeTwoTone";
import TimeIcon from "@mui/icons-material/AccessTimeTwoTone";
import PlayerCountIcon from "@mui/icons-material/GroupTwoTone";
import DesignerIcon from "@mui/icons-material/DesignServicesTwoTone";
import ArtistIcon from "@mui/icons-material/BrushTwoTone";
import PublisherIcon from "@mui/icons-material/MenuBookTwoTone";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import { GameDetails, LibraryGame } from "../../../../src/types/types";

import { useBggApi } from "../../hooks/useBggApi";

import { UserCircleListDisplay } from "../user/user-circle-list-display";
import { getExpandedGameDetailsFromBggXmlResult } from "../../helpers/bgg-game-details-xml-to-json";
import { PlayPreferenceRating } from "./play-preference-rating";
import { selectActiveUser } from "../../redux/active-user-slice";

export interface BggGameDetailDisplayProps {
  game: LibraryGame;
}

export function BggGameDetailDisplay(props: BggGameDetailDisplayProps): React.ReactElement {
  const { game } = props;

  const activeUser = useSelector(selectActiveUser);
  const activeUserPlayPreference = useMemo(() => activeUser?.playPreferences.find((preference) => preference.game.bggId === game.bggId), []);

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
    return encodedDescription.textContent;
  }, [gameDetails]);

  return (
    <>
      {gameDetails === undefined && (
        <CircularProgress />
      )}
      {gameDetails === null && (
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h5">
              {game.name}
            </Typography>
          </Grid>
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
          <Grid item>
            <Typography variant="h5">
              {game.name}
            </Typography>
          </Grid>
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
            <PlayPreferenceRating userPlayPreference={activeUserPlayPreference} />
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
            {decodedGameDescription && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    {decodedGameDescription}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Credits</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  <Grid container spacing={1}>
                    {gameDetails?.designers?.length > 0 && (
                      <Grid container item spacing={2}>
                        <Grid item><DesignerIcon color="primary" /></Grid>
                        <Grid item xs={11}>{`Designers: ${gameDetails.designers.join(", ")}`}</Grid>
                      </Grid>
                    )}
                    {gameDetails?.artists?.length > 0 && (
                      <Grid container item spacing={2}>
                        <Grid item><ArtistIcon color="primary" /></Grid>
                        <Grid item xs={11}>{`Artists: ${gameDetails.artists.join(", ")}`}</Grid>
                      </Grid>
                    )}
                    {gameDetails?.publishers?.length > 0 && (
                      <Grid container item spacing={2}>
                        <Grid item><PublisherIcon color="primary" /></Grid>
                        <Grid item xs={11}>{`Publishers: ${gameDetails.publishers.join(", ")}`}</Grid>
                      </Grid>
                    )}
                  </Grid>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      )}
    </>
  );
}
