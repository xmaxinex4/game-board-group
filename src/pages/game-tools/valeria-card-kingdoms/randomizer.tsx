import React, { useCallback, useState } from "react";

import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  Typography,
} from "@material-ui/core";

import { ValeriaCardKingdomsCard, ValeriaCardKingdomsCardSet } from "./data";
import { ValeriaCardKingdomsCardDisplay } from "./components/card-display";
import { getRandomizedCards } from "./helpers/get-randomized-cards";

export function ValeriaCardKingdomsRandomizer(): React.ReactElement {
  const setStorageKey = "valeria-card-kingdon-tool:sets";

  const [isOptionsModalOpen, setIsOptionsModalOpen] = React.useState(false);

  const openOptionsModal = () => {
    setIsOptionsModalOpen(true);
  };

  const closeOptionsModal = () => {
    setIsOptionsModalOpen(false);
  };

  const cardSetKeys = Object.keys(ValeriaCardKingdomsCardSet);
  const [cards, setCards] = useState<ValeriaCardKingdomsCard[]>([]);

  const emptyCardSetFilters = cardSetKeys.reduce(
    (o, key) => Object.assign(o, { [key]: false }),
    {},
  );

  const [cardSetFilters, setCardSetFilters] = useState(
    localStorage[setStorageKey]
      ? JSON.parse(localStorage[setStorageKey])
      : emptyCardSetFilters,
  );

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
      <div className="card-list">
        {cards.map((card) => (
          <ValeriaCardKingdomsCardDisplay
            key={card.name}
            title={card.name}
            imgSrc={card.imgSrc}
          />
        ))}
      </div>
      <Modal
        open={isOptionsModalOpen}
        onClose={closeOptionsModal}
        aria-labelledby="filter options"
        aria-describedby="options to set filter"
        id="options-modal"
        title="Options"
        className="options-modal"
      >
        <div className="custom-controls-stacked">
          <Typography>Sets</Typography>
          <FormGroup row>
            {cardSetKeys.map((key) => (
              <FormControlLabel
                label={key}
                control={(
                  <Checkbox
                    checked={cardSetFilters[key]}
                    onChange={handleCardSetFiltersChange}
                    name={key}
                  />
                )}
              />
            ))}
          </FormGroup>
        </div>
      </Modal>
    </>
  );
}
