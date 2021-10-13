/* eslint-disable react/jsx-props-no-spreading, no-unused-vars */

import React, { useCallback, useState } from "react";
import axios, { CancelTokenSource } from "axios";

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
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import useDebounce from "../../hooks/useDebounce";

import { Game } from "../../api-types/game";
import { useBggApi } from "../../hooks/useBggApi";
import { getGameDetailsFromBggXmlResult, getGamesFromBggXmlResult } from "../../helpers/bgg-search-xml-to-json";

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
  leftAlign: {
    marginLeft: "auto",
  },
}));

export interface GameSearchTypeaheadProps {
  games: Game[];
  setGames: React.Dispatch<React.SetStateAction<Game[]>>;
}

export function GameSearchTypeahead(props: GameSearchTypeaheadProps): React.ReactElement {
  const { games, setGames } = props;
  const { exactMatchSwitchClass, loadingIndicatorClass, leftAlign } = useStyles();

  const { CancelToken } = axios;
  const [activeRequestCancelToken, setActiveRequestCancelToken] = useState<CancelTokenSource>();

  const [options, setOptions] = React.useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [exactMatch, setExactMatch] = React.useState(false);

  const { bggApiGet } = useBggApi();

  const toggleExactMatch = () => setExactMatch(!exactMatch);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const addNewGameToSelectedGames = useCallback(async (bggId: string) => {
    const { data } = await bggApiGet(`/thing?id=${bggId}`); // this does not wait long enough :(
    // .then(({ data }) => {
    if (data as string) {
      const result = getGameDetailsFromBggXmlResult(data as string, bggId);
      const newGames = games.concat(result);
      console.log("newGames: ", newGames);
      setGames(newGames);
    }
    // }).catch(() => {
    //   console.log("Failed to add new game to list");
    // });
  }, []);

  React.useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);

        // BGG does not let you return a specified number of results, so it takes a long time for searches with short query lengths
        // For performance improvement, set exact match to true for queries length < 4 to avoid long load times
        let optimizedExactMatch = exactMatch;

        if (debouncedSearchTerm as string && (debouncedSearchTerm as string).split("")?.length < 4) {
          optimizedExactMatch = true;
        }

        // Cancel active requests no longer relevent
        if (activeRequestCancelToken) {
          activeRequestCancelToken.cancel();
        }

        const newCancelToken = CancelToken.source();
        setActiveRequestCancelToken(newCancelToken);

        bggApiGet(
          `/search?query=${debouncedSearchTerm}&exact=${optimizedExactMatch ? 1 : 0}&type=boardgame`,
          newCancelToken?.token,
        ).then(({ data }) => {
          if (data as string) {
            setActiveRequestCancelToken(undefined);
            const result = getGamesFromBggXmlResult(data as string);
            setOptions(result);
            setIsSearching(false);
          }
        }).catch((thrown) => {
          if (axios.isCancel(thrown)) {
            console.log("Request canceled", thrown.message);
          } else {
            setActiveRequestCancelToken(undefined);
            console.log("Request failed", thrown.message);
            setIsSearching(false);
          }
        });
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

    console.log("Setting search term to blank.");
    setSearchTerm("");

    console.log("Selecting bggId: ", bggId);

    if (!games.some((game) => game.bggId === bggId)) {
      addNewGameToSelectedGames(bggId);
    } else {
      // TODO: Highlight game thats already in the collection display
      console.log("Already have that game in list");
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
            selectOnFocus={false}
            onInputChange={handleChange}
            renderInput={(params) => (
              <Grid container direction="column">
                <Grid item>
                  <TextField
                    {...params}
                    label="Search Games"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                  />
                </Grid>
                <Grid item className={leftAlign}>
                  <Typography variant="caption" color="GrayText">Powered by BoardGameGeek</Typography>
                </Grid>
              </Grid>
            )}
            renderOption={(optionProps, option: any, { selected }) => (
              <ListItem onClick={(e) => onGameSelect(e, option.bggId)}>
                <ListItemText primary={option.name} secondary={option.year ? `Year: ${option.year}` : ""} />
              </ListItem>
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
