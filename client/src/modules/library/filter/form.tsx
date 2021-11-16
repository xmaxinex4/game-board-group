/* eslint-disable react/jsx-props-no-spreading */

import React, { useCallback, useState } from "react";

import {
  Box,
  Grid,
  Slider,
} from "@mui/material";

import { ActionButtons } from "../../common/button/action-buttons";
import { LibraryGameFilters } from "./model";

export interface FilterFormProps {
  setFilters: React.Dispatch<React.SetStateAction<LibraryGameFilters | undefined>>;
  onCancel: () => void;
}

export function FilterForm(props: FilterFormProps): React.ReactElement {
  const { onCancel, setFilters } = props;

  const [localFilters, setLocalFilters] = useState({
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

  const onComplexityChange = useCallback((event: Event, value: number | number[]) => {
    setLocalFilters({ ...localFilters, complexityRange: typeof value === "number" ? [value] : value });
  }, [setLocalFilters, localFilters]);

  return (
    <form noValidate onSubmit={handleFormSubmit}>
      <Grid container>
        <Grid item>
          <Box sx={{ width: 300 }}>
            <Slider
              getAriaLabel={() => "Complexity Range"}
              value={localFilters.complexityRange}
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
