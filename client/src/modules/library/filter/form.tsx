/* eslint-disable react/jsx-props-no-spreading,no-unused-vars */

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { union } from "lodash";

import CloseIcon from "@mui/icons-material/Close";

import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { selectActiveUserGroupLibraryCurrentFilters, setCurrentLibaryFilters } from "../../../redux/active-user-group-library-slice";

import { BggCategories, BggMechanics } from "./model";
import { SliderFilter } from "./slider-filter";
import { ComplexityFilter } from "./complexity-filter";

export interface FilterFormProps {
  onClose?: () => void;
}

export function FilterForm(props: FilterFormProps): React.ReactElement {
  const { onClose } = props;
  const dispatch = useDispatch();
  const currentLibaryFilters = useSelector(selectActiveUserGroupLibraryCurrentFilters);

  const onPlayerCountChange = useCallback((event: Event, value: number | number[]) => {
    dispatch(setCurrentLibaryFilters({
      newFilters: {
        ...currentLibaryFilters,
        minPlayers: typeof value === "number" ? value : value[0],
        maxPlayers: typeof value === "number" ? value : value[1],
      },
    }));
  }, [currentLibaryFilters]);

  const onComplexityChange = useCallback((value: number[]) => {
    dispatch(setCurrentLibaryFilters({
      newFilters: {
        ...currentLibaryFilters,
        complexityRange: value,
      },
    }));
  }, [currentLibaryFilters]);

  const onNameChange = useCallback((e) => {
    dispatch(setCurrentLibaryFilters({
      newFilters: {
        ...currentLibaryFilters,
        name: e.target.value,
      },
    }));
  }, [currentLibaryFilters]);

  const onMinAgeChange = useCallback((e, value: number | number[]) => {
    dispatch(setCurrentLibaryFilters({
      newFilters: {
        ...currentLibaryFilters,
        minAge: typeof value === "number" ? value : value[0],
        maxAge: typeof value === "number" ? value : value[1],
      },
    }));
  }, [currentLibaryFilters]);

  const onTimeChange = useCallback((e: Event, value: number | number[]) => {
    dispatch(setCurrentLibaryFilters({
      newFilters: {
        ...currentLibaryFilters,
        minPlayTime: typeof value === "number" ? value : value[0],
        maxPlayTime: typeof value === "number" ? value : value[1],
      },
    }));
  }, [currentLibaryFilters]);

  const onExpansionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    dispatch(setCurrentLibaryFilters({
      newFilters: {
        ...currentLibaryFilters,
        excludeExpansions: checked,
      },
    }));
  }, [currentLibaryFilters]);

  const onCategoryAndMechanicsChange = useCallback(
    (
      event: React.SyntheticEvent<Element, Event>,
      value: string[],
    ) => {
      dispatch(setCurrentLibaryFilters({
        newFilters: {
          ...currentLibaryFilters,
          categoriesOrMechanics: value,
        },
      }));
    },
    [currentLibaryFilters],
  );

  const baseMarks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
  ];

  const playerCountMarks = [
    ...baseMarks,
    {
      value: 6,
      label: "6",
    },
    {
      value: 7,
      label: "7+",
    },
  ];

  const minAgeMarks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 8,
      label: "8",
    },
    {
      value: 13,
      label: "13",
    },
    {
      value: 21,
      label: "21+",
    },
  ];

  const timeMarks = [
    {
      value: 0.5,
      label: "30min",
    },
    {
      value: 4,
      label: "4hr",
    },
    {
      value: 8,
      label: "8hr+",
    },
  ];

  return (
    <Grid container direction="column" spacing={2}>
      {onClose && (
        <Grid item sx={{ marginTop: "-8px", marginLeft: { xs: "auto" } }}>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      )}
      <Grid item container spacing={3} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ width: { xs: "100%" } }}
            id="name-filter"
            label="Name Contains"
            variant="outlined"
            onChange={onNameChange}
            autoComplete="none"
            size="small"
            inputProps={{ maxLength: 50 }}
            value={currentLibaryFilters.name}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            label={<Typography variant="subtitle2">Exclude Expansions</Typography>}
            control={
              <Checkbox checked={currentLibaryFilters.excludeExpansions} onChange={onExpansionChange} />
            }
          />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={6}>
          <SliderFilter
            onSliderValueChange={onMinAgeChange}
            label="Age"
            min={0}
            max={21}
            marks={minAgeMarks}
            filterValue={[currentLibaryFilters.minAge || 0, currentLibaryFilters.maxAge || 21]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ComplexityFilter
            onComplexityChange={onComplexityChange}
            filterValues={[currentLibaryFilters.complexityRange?.[0] || 0, currentLibaryFilters.complexityRange?.[1] || 5]}
          />
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={12} sm={6}>
          <SliderFilter
            onSliderValueChange={onPlayerCountChange}
            label="Player Count"
            min={1}
            max={7}
            marks={playerCountMarks}
            filterValue={[currentLibaryFilters.minPlayers || 1, currentLibaryFilters.maxPlayers || 7]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SliderFilter
            filterValue={[currentLibaryFilters.minPlayTime || 0, currentLibaryFilters.maxPlayTime || 8]}
            onSliderValueChange={onTimeChange}
            label="Time"
            min={0}
            max={8}
            step={0.5}
            marks={timeMarks}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Autocomplete
          sx={{ width: "100%" }}
          multiple
          id="category-filter"
          options={union(BggCategories, BggMechanics)}
          filterSelectedOptions
          onChange={onCategoryAndMechanicsChange}
          value={currentLibaryFilters.categoriesOrMechanics}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Categories & Mechanics"
              placeholder="Categories"
              size="small"
            />
          )}
        />
      </Grid>
      {onClose && (
        <Grid item>
          <Button fullWidth variant="outlined" onClick={onClose}>
            Apply
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
