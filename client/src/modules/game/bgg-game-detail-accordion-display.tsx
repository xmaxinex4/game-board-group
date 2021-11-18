import React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMoreTwoTone";
import DesignerIcon from "@mui/icons-material/DesignServicesTwoTone";
import ArtistIcon from "@mui/icons-material/BrushTwoTone";
import PublisherIcon from "@mui/icons-material/MenuBookTwoTone";
import CategoryIcon from "@mui/icons-material/CategoryTwoTone";
import MechanicIcon from "@mui/icons-material/BuildTwoTone";
import DescriptionIcon from "@mui/icons-material/DescriptionTwoTone";
import CreditIcon from "@mui/icons-material/PersonOutlineTwoTone";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Grid,
  Typography,
} from "@mui/material";

export interface BggGameDetailAccordionDisplayProps {
  categories?: string[];
  mechanics?: string[];
  gameDescription?: string;
  designers?: string[];
  artists?: string[];
  publishers?: string[];
}

export function BggGameDetailAccordionDisplay(props: BggGameDetailAccordionDisplayProps): React.ReactElement {
  const {
    categories,
    mechanics,
    gameDescription,
    designers,
    artists,
    publishers,
  } = props;

  return (
    <>
      {categories && categories?.length > 0 && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="game-categories-content"
            id="game-categories-header"
          >
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <CategoryIcon color="primary" />
              </Grid>
              <Grid item>
                <Typography>Categories</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              {categories.map((category) => (
                <Grid item key={`category-item-${category}`}>
                  <Chip
                    sx={{ maxWidth: { xs: "200px", sm: "500px" } }}
                    label={category}
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
      {mechanics && mechanics?.length > 0 && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="game-mechanics-content"
            id="game-mechanics-header"
          >
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <MechanicIcon color="primary" />
              </Grid>
              <Grid item>
                <Typography>Mechanics</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              {mechanics.map((mechanic) => (
                <Grid item key={`mechanic-item-${mechanic}`}>
                  <Chip
                    sx={{ maxWidth: { xs: "200px", sm: "500px" } }}
                    label={mechanic}
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
      {gameDescription && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="game-description-content"
            id="game-description-header"
          >
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <DescriptionIcon color="primary" />
              </Grid>
              <Grid item>
                <Typography>Desciption</Typography>
              </Grid>
            </Grid>
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
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <CreditIcon color="primary" />
            </Grid>
            <Grid item>
              <Typography>Credits</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
            <Grid container spacing={1}>
              {designers && designers?.length > 0 && (
                <Grid container item>
                  <Grid item xs={1}><DesignerIcon color="primary" /></Grid>
                  <Grid item xs={11}>{`Designers: ${designers.join(", ")}`}</Grid>
                </Grid>
              )}
              {artists && artists?.length > 0 && (
                <Grid container item>
                  <Grid item xs={1}><ArtistIcon color="primary" /></Grid>
                  <Grid item xs={11}>{`Artists: ${artists.join(", ")}`}</Grid>
                </Grid>
              )}
              {publishers && publishers?.length > 0 && (
                <Grid container item>
                  <Grid item xs={1}><PublisherIcon color="primary" /></Grid>
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
