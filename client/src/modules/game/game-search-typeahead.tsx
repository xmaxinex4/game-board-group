/* eslint-disable react/jsx-props-no-spreading, no-unused-vars */

import React, { useCallback } from "react";
import xmlConverter from "xml-js";

import {
  Autocomplete,
  AutocompleteInputChangeReason,
  Theme,
  CircularProgress,
  FormControlLabel,
  Grid,
  ListItem,
  ListItemText,
  TextField,
  Switch,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import useDebounce from "../../hooks/useDebounce";
import { Game } from "../../api-types/game";
import { useBggApi } from "../../hooks/useBggApi";
import { getGamesFromBggXmlResult } from "../../helpers/bgg-search-xml-to-json";

// import { GAME_SEARCH } from "../Queries";
// import { GameSearchQueryResult, GameSearchResult } from "../Types";

const useStyles = makeStyles<Theme>((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  exactMatchSwitchClass: {
    paddingRight: theme.spacing(),
  },
  loadingIndicatorClass: {
    position: "absolute",
    marginLeft: "250px",
  },
}));

export interface GameSearchTypeaheadProps {
  games: Game[];
  setGames: React.Dispatch<React.SetStateAction<Game[]>>;
}

export function GameSearchTypeahead(props: GameSearchTypeaheadProps): React.ReactElement {
  const { games, setGames } = props;
  const { exactMatchSwitchClass, loadingIndicatorClass } = useStyles();

  const [options, setOptions] = React.useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [exactMatch, setExactMatch] = React.useState(false);

  const { bggApiGet } = useBggApi();

  const toggleExactMatch = () => setExactMatch(!exactMatch);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // const setNewGamesState = (data: { gameDetails: GameDisplayDetails }) => {
  //   const { gameDetails } = data;
  //   const newGamesState = gamesState.concat(gameDetails);

  //   setGamesState(newGamesState);
  // };

  const addNewGameToSelectedGames = useCallback((bggId: string) => {
    // api get to retrieve game details
    console.log("addNewGameToSelectedGames for: ", bggId);
    setGames([]); // add found result to game list
  }, []);

  const onSelect = React.useCallback(
    (selectedBggId: string) => {
      console.log("Selecting bggId: ", selectedBggId);

      if (!games.some((game) => game.bggId === selectedBggId)) {
        addNewGameToSelectedGames(selectedBggId);
      } else {
        // TODO: Highlight game thats already in the collection display
        console.log("Already have that game in list");
      }
    },
    [],
  );

  // const onSearchCompleted = (result: GameSearchQueryResult) => {
  //   setIsSearching(false);
  //   setOptions(result.gameSearch || []);
  // }

  // const [getGameSearchResults, { loading, data, error }] = useLazyQuery<GameSearchQueryResult>(GAME_SEARCH, {
  //   variables: { search: debouncedSearchTerm, limit: 5, exact: exactMatch },
  //   onCompleted: onSearchCompleted
  // });

  React.useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        bggApiGet(`/search?query=${debouncedSearchTerm}&exact=${exactMatch ? 1 : 0}&type=boardgame`).then(({ data }) => {
          if (data as string) {
            const result = getGamesFromBggXmlResult(data as string);
            setOptions(result);
          }
        }).finally(() => setIsSearching(false));
      } else {
        setOptions([]);
      }
    }, [debouncedSearchTerm, exactMatch],
  );

  const handleChange = (event: React.ChangeEvent<{}>, value: string, reason: AutocompleteInputChangeReason) => {
    if (value) {
      setSearchTerm(value);
    }
  };

  const onGameSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, bggId: string) => {
    e.preventDefault();

    setSearchTerm("");
    if (onSelect) {
      onSelect(bggId);
    }
  };

  return (
    <Grid container alignItems="flex-end" direction="column">
      <Grid item>
        <FormControlLabel
          control={<Switch size="small" color="primary" checked={exactMatch} onChange={toggleExactMatch} />}
          label="Exact Match"
          labelPlacement="start"
          className={exactMatchSwitchClass}
        />
      </Grid>
      <Grid container alignItems="center" item>
        <Grid item>
          {isSearching && (
            <CircularProgress className={loadingIndicatorClass} size={20} />
          )}
        </Grid>
        <Grid item>
          <Autocomplete
            style={{ width: 300 }}
            getOptionLabel={(option: any) => option.name}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            freeSolo
            onInputChange={handleChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Games"
                variant="outlined"
                fullWidth
                value={searchTerm}
                helperText="Powered by BoardGameGeek"
              />
            )}
            renderOption={(test, option: any) => {
              console.log("option: ", option);
              return (
                <ListItem onClick={(e) => onGameSelect(e, option.bggId)}>
                  <ListItemText primary={option.name} secondary={option.year ? `Year: ${option.year}` : ""} />
                </ListItem>
              );
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
