import React, { useCallback, useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import FilterIcon from "@mui/icons-material/FilterAltTwoTone";

import {
  Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  Button,
} from "@mui/material";
import { LibraryGame } from "../../../../src/types/types";
import { FilterForm } from "./filter/form";
import { sortAndFilterGames } from "./filter/helpers";
import { LibraryGameFilters } from "./filter/model";

export interface LibraryFiltersAndSortProps {
  games: LibraryGame[];
  setFilteredGames: React.Dispatch<React.SetStateAction<LibraryGame[]>>;
}

export function LibraryFiltersAndSort(props: LibraryFiltersAndSortProps): React.ReactElement {
  const { games, setFilteredGames } = props;
  const [sort, setSort] = useState("nameAsc");
  const [filters, setFilters] = useState<LibraryGameFilters>();
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    setFilteredGames(sortAndFilterGames(games, sort, filters));
  }, [sort, setFilteredGames, games]);

  const onSortChange = useCallback((event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    setSort(value);
  }, []);

  const onOpenFilters = useCallback(() => {
    setFilterOpen(true);
  }, [setFilterOpen]);

  const onCloseFilters = useCallback(() => {
    setFilterOpen(false);
  }, [setFilterOpen]);

  return (
    <Grid container spacing={4} item alignItems="center" sx={{ paddingBottom: "24px" }}>
      <Grid item xs={12} sm="auto">
        <FormControl
          sx={{
            width: {
              xs: "100%",
              sm: "unset",
            },
            maxWidth: {
              xs: "400px",
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
            value={sort}
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
      <Grid item xs={12} sm="auto">
        <Button
          variant="outlined"
          color="primary"
          sx={{ paddingTop: "8px", paddingBottom: "8px", width: "100%" }}
          onClick={onOpenFilters}
          aria-label="Open Filters"
          startIcon={<FilterIcon />}
        >
          Filters
        </Button>
      </Grid>
      <Dialog
        onClose={onCloseFilters}
        open={filterOpen}
        sx={{

          ".MuiDialog-container": {
            marginTop: "32px",
            height: "unset",
          },
          ".MuiDialog-paper": {
            maxHeight: {
              xs: "475px",
              md: "750px",
            },
            width: "600px",
          },
        }}
        scroll="paper"
      >
        <DialogTitle>
          <Grid container alignItems="stretch" justifyContent="space-between">
            <Grid item xs={11}>
              <Typography noWrap variant="h6">
                Filters
              </Typography>
            </Grid>
            <Grid item xs={1} sx={{ marginLeft: { xs: "auto" } }}>
              <IconButton size="small" onClick={onCloseFilters}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <FilterForm initialFilters={filters} onCancel={onCloseFilters} setFilters={setFilters} />
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
