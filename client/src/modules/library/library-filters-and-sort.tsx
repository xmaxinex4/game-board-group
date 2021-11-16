import React, { useCallback, useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

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
} from "@mui/material";
import { LibraryGame } from "../../../../src/types/types";
import { FilterForm } from "./filter/form";

export interface LibraryFiltersAndSortProps {
  games: LibraryGame[];
  setFilteredGames: React.Dispatch<React.SetStateAction<LibraryGame[]>>;
}

export function LibraryFiltersAndSort(props: LibraryFiltersAndSortProps): React.ReactElement {
  const { games, setFilteredGames } = props;
  const [sort, setSort] = useState("nameAsc");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const sortedGames = [...games];

    switch (sort) {
      case "nameDesc":
        sortedGames.sort((a, b) => ((a.name < b.name) ? 1 : -1));
        setFilteredGames(sortedGames);
        break;
      case "nameAsc":
        sortedGames.sort((a, b) => ((a.name > b.name) ? 1 : -1));
        setFilteredGames(sortedGames);
        break;
      case "lowHighComp":
        sortedGames.sort((a, b) => ((a.gameDetails && b.gameDetails && (a.gameDetails.complexity > b.gameDetails.complexity)) ? 1 : -1));
        setFilteredGames(sortedGames);
        break;
      case "highLowComp":
        sortedGames.sort((a, b) => ((a.gameDetails && b.gameDetails && (a.gameDetails.complexity < b.gameDetails.complexity)) ? 1 : -1));
        setFilteredGames(sortedGames);
        break;
      case "newest":
        sortedGames.sort((a, b) => (((a.year && b.year) && a.year < b.year) ? 1 : -1));
        setFilteredGames(sortedGames);
        break;
      case "oldest":
        sortedGames.sort((a, b) => (((a.year && b.year) && a.year > b.year) ? 1 : -1));
        setFilteredGames(sortedGames);
        break;
      case "recentlyAdded":
        sortedGames.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
        setFilteredGames(sortedGames);
        break;
      default:
        setFilteredGames(games);
        break;
    }
  }, [sort, setFilteredGames]);

  const onSortChange = useCallback((event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    setSort(value);
  }, []);

  const onCloseFilters = useCallback(() => {
    setFilterOpen(false);
  }, [setFilterOpen]);

  return (
    <Grid container spacing={4} item alignItems="center" sx={{ paddingBottom: "24px" }}>
      <Grid item>
        <FormControl
          sx={{
            maxWidth: {
              xs: "200px",
              sm: "400px",
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
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="recentlyAdded">Most Recently Added</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Dialog
        onClose={onCloseFilters}
        open={filterOpen}
        sx={{ ".MuiDialog-container": { marginTop: "32px", height: "unset" } }}
      >
        <DialogTitle>
          <Grid container alignItems="stretch" justifyContent="space-between">
            <Grid item xs={11}>
              <Typography noWrap variant="h6">
                Filter
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
          <FilterForm games={games} onCancel={onCloseFilters} setFilteredGames={setFilteredGames} />
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
