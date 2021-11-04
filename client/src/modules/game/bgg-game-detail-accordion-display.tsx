import React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMoreTwoTone";
import DesignerIcon from "@mui/icons-material/DesignServicesTwoTone";
import ArtistIcon from "@mui/icons-material/BrushTwoTone";
import PublisherIcon from "@mui/icons-material/MenuBookTwoTone";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";

export interface BggGameDetailAccordionDisplayProps {
  gameDescription?: string;
  designers?: string[];
  artists?: string[];
  publishers?: string[];
}

export function BggGameDetailAccordionDisplay(props: BggGameDetailAccordionDisplayProps): React.ReactElement {
  const {
    gameDescription,
    designers,
    artists,
    publishers,
  } = props;

  return (
    <>
      {gameDescription && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="game-description-content"
            id="game-description-header"
          >
            <Typography>Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              {gameDescription}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="game-credits-content"
          id="game-credits-header"
        >
          <Typography>Credits</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
            <Grid container spacing={1}>
              {designers && designers?.length > 0 && (
                <Grid container item spacing={2}>
                  <Grid item><DesignerIcon color="primary" /></Grid>
                  <Grid item xs={11}>{`Designers: ${designers.join(", ")}`}</Grid>
                </Grid>
              )}
              {artists && artists?.length > 0 && (
                <Grid container item spacing={2}>
                  <Grid item><ArtistIcon color="primary" /></Grid>
                  <Grid item xs={11}>{`Artists: ${artists.join(", ")}`}</Grid>
                </Grid>
              )}
              {publishers && publishers?.length > 0 && (
                <Grid container item spacing={2}>
                  <Grid item><PublisherIcon color="primary" /></Grid>
                  <Grid item xs={11}>{`Publishers: ${publishers.join(", ")}`}</Grid>
                </Grid>
              )}
            </Grid>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
