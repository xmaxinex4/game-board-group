/* eslint-disable react/jsx-props-no-spreading */

import React, { useCallback, useState } from "react";

import {
  Box,
  Grid,
  Slider,
} from "@mui/material";

import { LibraryGameFilters } from "./model";
import { ActionButtons } from "../../common/button/action-buttons";
import { LibraryGame } from "../../../../../src/types/types";

export interface FilterFormProps {
  games: LibraryGame[];
  setFilteredGames: React.Dispatch<React.SetStateAction<LibraryGame[]>>;
  onCancel: () => void;
}

export function FilterForm(props: FilterFormProps): React.ReactElement {
  const { onCancel, setFilteredGames, games } = props;
  const [filters, setFilters] = useState<LibraryGameFilters>({});

  const handleSubmit = () => {
    console.log("Filters submit");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Filters handle submit");
    setFilteredGames(games);
  };

  const onComplexityChange = useCallback((event: Event, value: number | number[]) => {
    setFilters({ ...filters, complexityRange: value as number[] });
  }, [setFilters, filters]);

  return (
    <form noValidate onSubmit={handleFormSubmit}>
      <Grid container>
        <Grid item>
          <Box sx={{ width: 300 }}>
            <Slider
              getAriaLabel={() => "Complexity Range"}
              value={filters.complexityRange}
              onChange={onComplexityChange}
              valueLabelDisplay="auto"
              // getAriaValueText={valuetext}
              min={0}
              max={5}
            />
          </Box>
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
