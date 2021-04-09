import React, { useCallback, useMemo, useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";

import { Dialog } from "../../../modules/common/dialog/dialog";

import { ValeriaCardKingdomsCard, ValeriaCardKingdomsSetFilters } from "./data";
// import { ValeriaCardKingdomsCardDisplay } from "./components/card-display";
import { getRandomizedCards } from "./helpers/get-randomized-cards";
import { ValeriaCardKingdomsFilterOptionsCard } from "./components/filter-options-card";

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

  const saveSetFiltersToLocalStorage = useCallback(() => {
    localStorage[setStorageKey] = JSON.stringify(cardSetFilters);
  }, [cardSetFilters]);

  const randomize = useCallback(() => setCards(getRandomizedCards(cardSetFilters)), []);

  const { firstRowCards, secondRowCards, thirdRowCards } = useMemo(() => ({
    firstRowCards: cards.slice(0, 5),
    secondRowCards: cards.slice(5, 10),
    thirdRowCards: cards.slice(10, 15),
  }), [cards]);

  return (
    <>
      <Typography>Valeria Card Kingdom Randomizer</Typography>
      <Button
        color="secondary"
        onClick={openOptionsDialog}
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
        <Grid container justify="center" alignItems="center" item spacing={2}>
          {firstRowCards.map((card) => (
            <Grid item xs={2}>
              <Card>
                <CardHeader title={card.name} />
                <CardMedia
                  style={{ height: "250px" }}
                  image={card.imgSrc}
                  title={card.name}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container justify="center" alignItems="center" item spacing={2}>
          {secondRowCards.map((card) => (
            <Grid item xs={2}>
              <Card>
                <CardHeader title={card.name} />
                <CardMedia
                  style={{ height: "250px" }}
                  image={card.imgSrc}
                  title={card.name}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container justify="center" alignItems="center" item spacing={2}>
          {thirdRowCards.map((card) => (
            <Grid item xs={2}>
              <Card>
                <CardHeader title={card.name} />
                <CardMedia
                  style={{ height: "250px" }}
                  image={card.imgSrc}
                  title={card.name}
                />
              </Card>
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
