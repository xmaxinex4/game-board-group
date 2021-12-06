import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FilterIcon from "@mui/icons-material/FilterAltTwoTone";
import ChevronUp from "@mui/icons-material/KeyboardArrowUp";
import ChevronDown from "@mui/icons-material/KeyboardArrowDown";
import ClearFiltersIcon from "@mui/icons-material/FilterAltOffTwoTone";

import {
  Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Button,
  Drawer,
  Theme,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { LibraryGame } from "../../../../src/types/types";

import {
  getActiveFilterCount,
  selectActiveUserGroupLibraryCurrentSort,
  setCurrentLibaryFilters,
  setCurrentLibarySort,
} from "../../redux/active-user-group-library-slice";

import { FilterForm } from "./filter/form";
import { FilterFormCard } from "./filter/form-card";

export interface LibraryFiltersAndSortProps {
  games: LibraryGame[];
}

export function LibraryFiltersAndSort(props: LibraryFiltersAndSortProps): React.ReactElement {
  const { games } = props;

  const theme = useTheme<Theme>();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch();
  const currentLibarySort = useSelector(selectActiveUserGroupLibraryCurrentSort);
  const filterCount = useSelector(getActiveFilterCount);

  const [filterOpen, setFilterOpen] = useState(false);

  const onSortChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    dispatch(setCurrentLibarySort({
      newSort: value,
    }));
  };

  const toggleFilters = useCallback(() => {
    setFilterOpen(!filterOpen);
  }, [setFilterOpen, filterOpen]);

  const closeFilters = useCallback(() => {
    setFilterOpen(false);
  }, [setFilterOpen, filterOpen]);

  const clearFilters = () => {
    dispatch(setCurrentLibaryFilters({
      newFilters: {},
    }));
  };

  return (
    <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center" sx={{ paddingBottom: "24px" }}>
      <Grid item>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item xs={12} md="auto">
            <FormControl
              sx={{
                width: {
                  xs: "100%",
                  md: "unset",
                },
                maxWidth: {
                  xs: "600px",
                },
                minWidth: {
                  xs: "200px",
                },
              }}
              variant="outlined"
            >
              <InputLabel id="sort-by-select">Sort By</InputLabel>
              <Select
                labelId="sort-by-select"
                onChange={onSortChange}
                value={currentLibarySort}
                label="Sort By"
                size="small"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="nameAsc">A-Z</MenuItem>
                <MenuItem value="nameDesc">Z-A</MenuItem>
                {games[0].gameDetails && (
                  <MenuItem value="lowHighComp">Low to High Complexity</MenuItem>
                )}
                {games[0].gameDetails && (
                  <MenuItem value="highLowComp">High to Low Complexity</MenuItem>
                )}
                {games[0].gameDetails && (
                  <MenuItem value="shortestTimes">Shortest Play Time</MenuItem>
                )}
                {games[0].gameDetails && (
                  <MenuItem value="longestTimes">Longest Play Time</MenuItem>
                )}
                {games[0].year && (
                  <MenuItem value="newest">Newest</MenuItem>
                )}
                {games[0].year && (
                  <MenuItem value="oldest">Oldest</MenuItem>
                )}
                <MenuItem value="recentlyAdded">Most Recently Added</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md="auto">
            <Button
              variant="outlined"
              color="primary"
              sx={{ paddingTop: "8px", paddingBottom: "8px", width: "100%" }}
              onClick={toggleFilters}
              aria-label="Open Filters"
              startIcon={<FilterIcon />}
              endIcon={filterOpen ? <ChevronUp /> : <ChevronDown />}
            >
              {`Filters (${filterCount})`}
            </Button>
          </Grid>
          <Grid item xs={6} md="auto">
            <Button
              variant="outlined"
              color="primary"
              sx={{ paddingTop: "8px", paddingBottom: "8px", width: "100%" }}
              onClick={clearFilters}
              aria-label="Open Filters"
              startIcon={<ClearFiltersIcon />}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {filterOpen && isSmUp && (
        <Grid item>
          <FilterFormCard />
        </Grid>
      )}
      {filterOpen && !isSmUp && (
        <Drawer
          sx={{
            width: "300px",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "300px",
            },
          }}
          variant="persistent"
          anchor="right"
          open={filterOpen}
          onClose={closeFilters}
        >
          <Grid item sx={{ padding: "16px" }}>
            <FilterForm onClose={closeFilters} />
          </Grid>
        </Drawer>
      )}
    </Grid>
  );
}
