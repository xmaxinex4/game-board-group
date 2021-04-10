/* eslint-disable no-unused-vars */

import React from "react";

import CloseIcon from "@material-ui/icons/Close";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";

import { ValeriaCardKingdomsSetFilters } from "../data";

const useStyles = makeStyles<Theme>((theme) => ({
  padding: {
    padding: `${theme.spacing(1)}px`,
  },
}));

export interface ValeriaCardKingdomsFilterOptionsCardProps {
  cardSetFilters: ValeriaCardKingdomsSetFilters,
  setCardSetFilters: React.Dispatch<React.SetStateAction<ValeriaCardKingdomsSetFilters>>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  onClose: () => void;
}

export function ValeriaCardKingdomsFilterOptionsCard(props: ValeriaCardKingdomsFilterOptionsCardProps): React.ReactElement {
  const {
    cardSetFilters,
    setCardSetFilters,
    onChange,
    onClose,
  } = props;

  const { card, padding } = useStyles();

  const {
    base,
    crimsonSeas,
    flamesAndFrost,
    gnollMonsterPack,
    peasantsAndKnights,
    shadowvale,
    undeadSamurai,
  } = cardSetFilters;

  const handleCardSetFiltersChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setCardSetFilters({ ...cardSetFilters, [event.target.name]: checked });

    if (onChange) {
      onChange(event, checked);
    }
  };

  return (
    <Card className={card}>
      <CardHeader
        action={(
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        )}
        title="Filter by Set"
      />

      <Divider />

      <CardContent>
        <FormGroup>
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
            control={<Checkbox checked={gnollMonsterPack} onChange={handleCardSetFiltersChange} name="gnollMonsterPack" />}
            label="Gnoll Monster Pack"
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
      </CardContent>

      <Divider />

      <CardActions>
        <Grid container justify="flex-end">
          <Grid item className={padding}>
            <Button variant="contained" color="primary" onClick={onClose}>Ok</Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
