/* eslint-disable react/jsx-props-no-spreading */

import React, { useCallback, useState } from "react";

import {
  Autocomplete,
  Grid,
  TextField,
} from "@mui/material";

import { ActionButtons } from "../../common/button/action-buttons";
import { BggCategories, BggMechanics, LibraryGameFilters } from "./model";
import { SliderFilter } from "./slider-filter";

export interface FilterFormProps {
  initialFilters?: LibraryGameFilters;
  setFilters: React.Dispatch<React.SetStateAction<LibraryGameFilters | undefined>>;
  onCancel: () => void;
}

export function FilterForm(props: FilterFormProps): React.ReactElement {
  const { onCancel, setFilters, initialFilters } = props;

  // const [errors, setErrors] = useState<{ playerCount: string; }>({
  //   playerCount: "",
  // });

  const [localFilters, setLocalFilters] = useState<LibraryGameFilters>({
    complexityRange: [0, 5],
    excludeExpansions: false,
  });

  const handleSubmit = () => {
    setFilters(localFilters);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  const onPlayCountChange = useCallback((event: Event, value: number | number[]) => {
    setLocalFilters({
      ...localFilters,
      minPlayers: typeof value === "number" ? value : value[0],
      maxPlayers: typeof value === "number" ? value : value[1],
    });
  }, [setLocalFilters, localFilters]);

  const onComplexityChange = useCallback((event: Event, value: number | number[]) => {
    setLocalFilters({ ...localFilters, complexityRange: typeof value === "number" ? [value] : value });
  }, [setLocalFilters, localFilters]);

  const onNameChange = useCallback((e) => {
    setLocalFilters({ ...localFilters, name: e.target.value });
  }, [setLocalFilters]);

  const onMinAgeChange = useCallback((e) => {
    setLocalFilters({ ...localFilters, minAge: e.target.value });
  }, [setLocalFilters]);

  const onYearChange = useCallback((e) => {
    setLocalFilters({ ...localFilters, minYearPublished: e.target.value });
  }, [setLocalFilters]);

  const onTimeChange = useCallback((event: Event, value: number | number[]) => {
    setLocalFilters({
      ...localFilters,
      minPlayTime: typeof value === "number" ? value : value[0],
      maxPlayTime: typeof value === "number" ? value : value[1],
    });
  }, [setLocalFilters]);

  const complexityMarks = [
    {
      value: 0,
      label: "0",
    },
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
    ...complexityMarks,
    {
      value: 6,
      label: "6",
    },
    {
      value: 7,
      label: "7+",
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
    <form noValidate onSubmit={handleFormSubmit}>
      <Grid sx={{ paddingTop: "20px" }} container direction="column" spacing={4}>
        <Grid item>
          <TextField
            sx={{ width: { xs: "100%", md: "350px" } }}
            id="name-filter"
            label="Name Contains"
            variant="outlined"
            onChange={onNameChange}
            autoComplete="none"
            size="small"
            inputProps={{ maxLength: 50 }}
            defaultValue={initialFilters?.name || ""}
          />
        </Grid>
        <Grid item>
          <TextField
            sx={{ width: "112px" }}
            id="min-age-filter"
            label="Min Age"
            variant="outlined"
            onChange={onMinAgeChange}
            autoComplete="none"
            size="small"
            type="number"
            inputProps={{ min: 0, max: 200 }}
            defaultValue={initialFilters?.minAge || ""}
          />
        </Grid>
        <Grid item>
          <SliderFilter
            initialValues={[0, 7]}
            onSliderValueChange={onPlayCountChange}
            label="Player Count"
            min={0}
            max={7}
            marks={playerCountMarks}
          />
        </Grid>
        <Grid item>
          <SliderFilter
            initialValues={[0, 8]}
            onSliderValueChange={onTimeChange}
            label="Time"
            min={0}
            max={8}
            step={0.5}
            marks={timeMarks}
          />
        </Grid>
        <Grid item>
          <SliderFilter
            initialValues={[0, 5]}
            onSliderValueChange={onComplexityChange}
            label="Complexity"
            min={0}
            max={5}
            marks={complexityMarks}
          />
        </Grid>
        <Grid item>
          <TextField
            sx={{ width: "112px" }}
            id="year-filter"
            label="Year"
            variant="outlined"
            onChange={onYearChange}
            autoComplete="none"
            size="small"
            type="number"
            inputProps={{ min: 1800, max: 3000 }}
            defaultValue={initialFilters?.minYearPublished || ""}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            sx={{ width: "100%" }}
            multiple
            id="category-filter"
            options={BggCategories}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categories"
                placeholder="Categories"
                size="small"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            sx={{ width: "100%" }}
            multiple
            id="mechanic-filterd"
            options={BggMechanics}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Mechanics"
                placeholder="Mechanics"
                size="small"
              />
            )}
          />
        </Grid>
        <Grid item>
          <ActionButtons
            formButtons
            onSave={handleSubmit}
            onCancel={onCancel}
          />
        </Grid>
      </Grid>
    </form>
  );
}
