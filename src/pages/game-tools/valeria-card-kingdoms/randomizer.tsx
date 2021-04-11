import React, { useCallback, useMemo, useState } from "react";

import { Button, Grid, Typography } from "@material-ui/core";

import { Dialog } from "../../../modules/common/dialog/dialog";

import { ValeriaCardKingdomsCard, ValeriaCardKingdomsSetFilters } from "./data";
import { getRandomizedCards } from "./helpers/get-randomized-cards";
import { ValeriaCardKingdomsFilterOptionsCard } from "./components/filter-options-card";
import { ValeriaCardKingdomsCardDisplay } from "./components/card-display";

export function ValeriaCardKingdomsRandomizer(): React.ReactElement {
  const setStorageKey = "valeria-card-kingdon-tool:sets";
  const [isOptionsDialogOpen, setIsOptionsDialogOpen] = React.useState(false);

  const openOptionsDialog = () => {
    setIsOptionsDialogOpen(true);
  };

  const closeOptionsDialog = () => {
    setIsOptionsDialogOpen(false);
  };

  const [cards, setCards] = useState<ValeriaCardKingdomsCard[]>([]);

  const emptyCardSetFilters: ValeriaCardKingdomsSetFilters = {
    base: true,
    crimsonSeas: false,
    flamesAndFrost: false,
    gnollMonsterPack: false,
    peasantsAndKnights: false,
    shadowvale: false,
    undeadSamurai: false,
  };

  const [cardSetFilters, setCardSetFilters] = useState<ValeriaCardKingdomsSetFilters>(
    localStorage[setStorageKey]
      ? JSON.parse(localStorage[setStorageKey])
      : emptyCardSetFilters,
  );

  const saveSetFiltersToLocalStorage = useCallback(() => {
    localStorage[setStorageKey] = JSON.stringify(cardSetFilters);
  }, [cardSetFilters]);

  const randomize = useCallback(
    () => {
      console.log("randomizing. cardSetFilters are: ", cardSetFilters);
      setCards(getRandomizedCards(cardSetFilters));
    },
    [cardSetFilters, setCards],
  );

  const { firstRowCards, secondRowCards, thirdRowCards } = useMemo(() => ({
    firstRowCards: cards.slice(0, 5),
    secondRowCards: cards.slice(5, 10),
    thirdRowCards: cards.slice(10, 15),
  }), [cards]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid container justify="center" alignItems="center" item spacing={2}>
          <Grid container item direction="column" alignItems="center" spacing={2} xs={12}>
            <Grid item>
              <Typography variant="h6">Valeria Card Kingdoms Randomizer</Typography>
            </Grid>
            <Grid container justify="center" spacing={2} item>
              <Grid item>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={openOptionsDialog}
                >
                  Filters
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => randomize()}
                >
                  Randomize
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {firstRowCards.map((card) => (
            <Grid key={card.name} item xs={2}>
              <ValeriaCardKingdomsCardDisplay title={card.name} imgSrc={card.imgSrc} />
            </Grid>
          ))}
        </Grid>
        <Grid container justify="center" alignItems="center" item spacing={2}>
          {secondRowCards.map((card) => (
            <Grid key={card.name} item xs={2}>
              <ValeriaCardKingdomsCardDisplay title={card.name} imgSrc={card.imgSrc} />
            </Grid>
          ))}
        </Grid>
        <Grid container justify="center" alignItems="center" item spacing={2}>
          {thirdRowCards.map((card) => (
            <Grid key={card.name} item xs={2}>
              <ValeriaCardKingdomsCardDisplay title={card.name} imgSrc={card.imgSrc} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Dialog isDialogOpen={isOptionsDialogOpen} setIsDialogOpen={setIsOptionsDialogOpen}>
        <ValeriaCardKingdomsFilterOptionsCard
          cardSetFilters={cardSetFilters}
          setCardSetFilters={setCardSetFilters}
          onChange={saveSetFiltersToLocalStorage}
          onClose={closeOptionsDialog}
        />
      </Dialog>
    </>
  );
}
