/* eslint-disable no-unused-vars */

import React, { useCallback } from "react";

import CloseIcon from "@material-ui/icons/Close";

import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  makeStyles,
  Switch,
  Theme,
  Typography,
} from "@material-ui/core";

import { ValeriaCardKingdomsSetFilters } from "../data";
import { BaseSetIndicator } from "../images/set-indicators/base";
import { CrimsonSeasSetIndicator } from "../images/set-indicators/crimson-seas";
import { GnollMonsterPackSetIndicator } from "../images/set-indicators/gnoll-monster-pack";
import { PeasantsAndKnightsSetIndicator } from "../images/set-indicators/peasants-and-knights";
import { UndeadSamuraiSetIndicator } from "../images/set-indicators/undead-samurai";
import { ShadowvaleSetIndicator } from "../images/set-indicators/shadowvale";
import { FlamesAndFrostSetIndicator } from "../images/set-indicators/flames-and-frost";

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
              label={(
                <Grid container justify="center" alignItems="center" spacing={1}>
                  <Hidden xsDown>
                    <Grid item>
                      <BaseSetIndicator />
                    </Grid>
                  </Hidden>
                  <Grid item>
                    <Typography>Base</Typography>
                  </Grid>
                </Grid>
              )}
              labelPlacement="start"
              className={modalSwitchControls}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Switch checked={crimsonSeas} onChange={handleCardSetFiltersChange} name="crimsonSeas" />}
              label={(
                <Grid container justify="center" alignItems="center" spacing={1}>
                  <Hidden xsDown>
                    <Grid item>
                      <CrimsonSeasSetIndicator />
                    </Grid>
                  </Hidden>
                  <Grid item>
                    <Typography>Crimson Seas</Typography>
                  </Grid>
                </Grid>
              )}
              labelPlacement="start"
              className={modalSwitchControls}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Switch checked={flamesAndFrost} onChange={handleCardSetFiltersChange} name="flamesAndFrost" />}
              label={(
                <Grid container justify="center" alignItems="center" spacing={1}>
                  <Hidden xsDown>
                    <Grid item>
                      <FlamesAndFrostSetIndicator />
                    </Grid>
                  </Hidden>
                  <Grid item>
                    <Typography>Flames And Frost</Typography>
                  </Grid>
                </Grid>
              )}
              labelPlacement="start"
              className={modalSwitchControls}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Switch checked={gnollMonsterPack} onChange={handleCardSetFiltersChange} name="gnollMonsterPack" />}
              label={(
                <Grid container justify="center" alignItems="center" spacing={1}>
                  <Hidden xsDown>
                    <Grid item>
                      <GnollMonsterPackSetIndicator />
                    </Grid>
                  </Hidden>
                  <Grid item>
                    <Typography>Gnoll Monster Pack</Typography>
                  </Grid>
                </Grid>
              )}
              labelPlacement="start"
              className={modalSwitchControls}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Switch checked={peasantsAndKnights} onChange={handleCardSetFiltersChange} name="peasantsAndKnights" />}
              label={(
                <Grid container justify="center" alignItems="center" spacing={1}>
                  <Hidden xsDown>
                    <Grid item>
                      <PeasantsAndKnightsSetIndicator />
                    </Grid>
                  </Hidden>
                  <Grid item>
                    <Typography>Peasants And Knights</Typography>
                  </Grid>
                </Grid>
              )}
              labelPlacement="start"
              className={modalSwitchControls}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Switch checked={shadowvale} onChange={handleCardSetFiltersChange} name="shadowvale" />}
              label={(
                <Grid container justify="center" alignItems="center" spacing={1}>
                  <Hidden xsDown>
                    <Grid item>
                      <ShadowvaleSetIndicator />
                    </Grid>
                  </Hidden>
                  <Grid item>
                    <Typography>Shadowvale</Typography>
                  </Grid>
                </Grid>
              )}
              labelPlacement="start"
              className={modalSwitchControls}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Switch checked={undeadSamurai} onChange={handleCardSetFiltersChange} name="undeadSamurai" />}
              label={(
                <Grid container justify="center" alignItems="center" spacing={1}>
                  <Hidden xsDown>
                    <Grid item>
                      <UndeadSamuraiSetIndicator />
                    </Grid>
                  </Hidden>
                  <Grid item>
                    <Typography>Undead Samurai</Typography>
                  </Grid>
                </Grid>
              )}
              labelPlacement="start"
              className={modalSwitchControls}
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
