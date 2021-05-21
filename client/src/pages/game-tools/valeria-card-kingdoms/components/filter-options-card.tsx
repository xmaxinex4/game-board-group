/* eslint-disable no-unused-vars */

import React, { useCallback } from "react";

import CloseIcon from "@material-ui/icons/Close";

import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  makeStyles,
  Switch,
  Theme,
} from "@material-ui/core";

import { ValeriaCardKingdomsSetFilters } from "../data";

const useStyles = makeStyles<Theme>((theme) => ({
  modalCard: {
    overflowY: "auto",
  },
  modalSwitchControls: {

  },
  modalActionButton: {
    paddingRight: `${theme.spacing(2)}px`,
  },
}));

export interface ValeriaCardKingdomsFilterOptionsCardProps {
  cardSetFilters: ValeriaCardKingdomsSetFilters,
  setCardSetFilters: React.Dispatch<React.SetStateAction<ValeriaCardKingdomsSetFilters>>;
  cardSetFilterStorageKey: string;
  onClose: () => void;
  onRandomize: () => void;
}

export function ValeriaCardKingdomsFilterOptionsCard(props: ValeriaCardKingdomsFilterOptionsCardProps): React.ReactElement {
  const {
    cardSetFilters,
    setCardSetFilters,
    cardSetFilterStorageKey,
    onClose,
    onRandomize,
  } = props;

  const { modalCard, modalSwitchControls, modalActionButton } = useStyles();

  const {
    base,
    crimsonSeas,
    flamesAndFrost,
    gnollMonsterPack,
    peasantsAndKnights,
    shadowvale,
    undeadSamurai,
  } = cardSetFilters;

  const onRandomizeActionButton = useCallback(() => {
    onRandomize();
    onClose();
  }, [onRandomize, onClose]);

  const handleCardSetFiltersChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const newSetFilters = { ...cardSetFilters, [event.target.name]: checked };

    setCardSetFilters(newSetFilters);
    localStorage[cardSetFilterStorageKey] = JSON.stringify(newSetFilters);
  }, [cardSetFilters, setCardSetFilters, cardSetFilterStorageKey]);

  return (
    <Card className={modalCard}>
      <CardContent>
        <List subheader={
          (
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <ListSubheader>Filter By Set</ListSubheader>
              </Grid>
              <Grid item>
                <IconButton onClick={onClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          )
        }
        >
          <ListItem>
            <FormControlLabel
              control={<Switch checked={base} onChange={handleCardSetFiltersChange} name="base" />}
              label="Base"
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Switch checked={crimsonSeas} onChange={handleCardSetFiltersChange} name="crimsonSeas" />}
              label="Crimson Seas"
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Switch checked={flamesAndFrost} onChange={handleCardSetFiltersChange} name="flamesAndFrost" />}
              label="Flames And Frost"
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Switch checked={gnollMonsterPack} onChange={handleCardSetFiltersChange} name="gnollMonsterPack" />}
              label="Gnoll Monster Pack"
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Switch checked={peasantsAndKnights} onChange={handleCardSetFiltersChange} name="peasantsAndKnights" />}
              label="Peasants And Knights"
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Switch checked={shadowvale} onChange={handleCardSetFiltersChange} name="shadowvale" />}
              label="Shadowvale"
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Switch checked={undeadSamurai} onChange={handleCardSetFiltersChange} name="undeadSamurai" />}
              label="Undead Samurai"
            />
          </ListItem>
        </List>
        <Grid container justify="flex-end">
          <Grid item className={modalActionButton}>
            <Button variant="contained" color="primary" onClick={onRandomizeActionButton}>Randomize</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
