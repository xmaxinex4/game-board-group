import React, { useCallback, useState } from "react";

import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@material-ui/core";

import { Modal } from "../../../modules/common/modal/modal";

import { ValeriaCardKingdomsCard, ValeriaCardKingdomsSetFilters } from "./data";
import { ValeriaCardKingdomsCardDisplay } from "./components/card-display";
import { getRandomizedCards } from "./helpers/get-randomized-cards";

export function ValeriaCardKingdomsRandomizer(): React.ReactElement {
  const setStorageKey = "valeria-card-kingdon-tool:sets";
  const [isOptionsModalOpen, setIsOptionsModalOpen] = React.useState(false);

  const openOptionsModal = () => {
    setIsOptionsModalOpen(true);
  };

  const [cards, setCards] = useState<ValeriaCardKingdomsCard[]>([]);

  const emptyCardSetFilters: ValeriaCardKingdomsSetFilters = {
    base: false,
    crimsonSeas: false,
    flamesAndFrost: false,
    peasantsAndKnights: false,
    shadowvale: false,
    undeadSamurai: false,
  };

  const [cardSetFilters, setCardSetFilters] = useState<ValeriaCardKingdomsSetFilters>(
    localStorage[setStorageKey]
      ? JSON.parse(localStorage[setStorageKey])
      : emptyCardSetFilters,
  );

  const {
    base,
    crimsonSeas,
    flamesAndFrost,
    peasantsAndKnights,
    shadowvale,
    undeadSamurai,
  } = cardSetFilters;

  const randomize = useCallback(() => setCards(getRandomizedCards(cardSetFilters)), []);
  const saveSetFilters = useCallback(() => {
    localStorage[setStorageKey] = JSON.stringify(cardSetFilters);
  }, [cardSetFilters]);

  const handleCardSetFiltersChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setCardSetFilters({ ...cardSetFilters, [event.target.name]: checked });
    saveSetFilters();
  };

  return (
    <>
      <Typography>Valeria Card Kingdom Randomizer</Typography>
      <Button
        color="secondary"
        onClick={openOptionsModal}
      >
        Options
      </Button>
      <Button
        color="primary"
        onClick={() => randomize()}
      >
        Randomize
      </Button>
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item>
            <ValeriaCardKingdomsCardDisplay
              key={card.name}
              title={card.name}
              imgSrc={card.imgSrc}
            />
          </Grid>
        ))}
      </Grid>
      <Modal isModalOpen={isOptionsModalOpen} setIsModalOpen={setIsOptionsModalOpen}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h4">Filter By Sets</Typography>
          </Grid>
          <Grid item>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={base} onChange={handleCardSetFiltersChange} name="base" />}
                label="Base"
              />
              <FormControlLabel
                control={<Checkbox checked={crimsonSeas} onChange={handleCardSetFiltersChange} name="crimsonSeas" />}
                label="Crimson Seas"
              />
              <FormControlLabel
                control={<Checkbox checked={flamesAndFrost} onChange={handleCardSetFiltersChange} name="flamesAndFrost" />}
                label="Flames And Frost"
              />
              <FormControlLabel
                control={<Checkbox checked={peasantsAndKnights} onChange={handleCardSetFiltersChange} name="peasantsAndKnights" />}
                label="Peasants And Knights"
              />
              <FormControlLabel
                control={<Checkbox checked={shadowvale} onChange={handleCardSetFiltersChange} name="shadowvale" />}
                label="Shadowvale"
              />
              <FormControlLabel
                control={<Checkbox checked={undeadSamurai} onChange={handleCardSetFiltersChange} name="undeadSamurai" />}
                label="Undead Samurai"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}
