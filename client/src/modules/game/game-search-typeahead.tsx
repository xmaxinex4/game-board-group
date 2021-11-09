/* eslint-disable react/jsx-props-no-spreading, no-unused-vars */

import React, {
  useCallback,
  useState,
  useContext,
  // FormEvent,
} from "react";
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
  InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Game } from ".prisma/client";

import useDebounce from "../../hooks/useDebounce";
import { useBggApi } from "../../hooks/useBggApi";
import { getGameDetailsFromBggXmlResult, getGamesFromBggXmlResult } from "../../helpers/bgg-search-xml-to-json";
import { GamesStateContext } from "../../contexts/upsert-games-state-context";

const useStyles = makeStyles<Theme>((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  exactMatchSwitchClass: {
    paddingRight: theme.spacing(),
  },
  leftAlign: {
    marginLeft: "auto",
  },
}));

export interface GameSearchTypeaheadProps {
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

export function GameSearchTypeahead(props: GameSearchTypeaheadProps): React.ReactElement {
  const { CancelToken } = axios;

  const { setIsFocused, isFocused } = props;
  const { games, setGames } = useContext(GamesStateContext);
  const { exactMatchSwitchClass, leftAlign } = useStyles();

  const [activeRequestCancelToken, setActiveRequestCancelToken] = useState<CancelTokenSource>();

  const [options, setOptions] = React.useState<Pick<Game, "bggId" | "name" | "year">[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [exactMatch, setExactMatch] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOnOpen = useCallback(() => {
    if (searchTerm.length > 0) {
      setOpen(true);
    }
  }, [searchTerm, setOpen]);

  const { bggApiGet } = useBggApi();

  const toggleExactMatch = () => setExactMatch(!exactMatch);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const addNewGameToSelectedGames = useCallback(async (bggId: string) => {
    const { data } = await bggApiGet(`/thing?id=${bggId}`);

    if (data as string) {
      const result = getGameDetailsFromBggXmlResult(data as string, bggId);
      const newGamesState = games?.concat(result);
      if (newGamesState && setGames) setGames(newGamesState);
    }
  }, [games, setGames]);

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
    if (reason !== "reset") {
      setSearchTerm(value);
    }

    if (searchTerm.length > 0 && reason !== "reset") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const onGameSelect = (
    e: React.SyntheticEvent<Element, Event>,
    bggId: string,
  ) => {
    e.preventDefault();

    setSearchTerm("");

    if (!games?.some((game) => game.bggId === bggId)) {
      addNewGameToSelectedGames(bggId);
    } else {
      // TODO: Highlight game thats already in the collection display
      console.log("Already have that game in list");
    }

    setOpen(false);
  };

  const isOptionEqualToValue = useCallback(
    (option: Pick<Game, "bggId" | "name" | "year">, value: Pick<Game, "bggId" | "name" | "year">): boolean => (
      option.bggId === value.bggId
    ),
    [],
  );

  const onSetIsFocused = useCallback(() => setIsFocused(true), [setIsFocused]);
  const onBlur = useCallback(() => {
    setIsFocused(false);
    setOpen(false);
  }, [setIsFocused, setOpen]);

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
      <Grid item sx={{ width: "100%" }}>
        <Autocomplete
          open={open}
          onOpen={handleOnOpen}
          disableClearable
          clearOnBlur={false}
          onFocus={onSetIsFocused}
          onBlur={onBlur}
          getOptionLabel={(option: Pick<Game, "bggId" | "name" | "year">) => option.name}
          filterOptions={(x) => x}
          options={options}
          includeInputInList
          selectOnFocus={false}
          inputValue={searchTerm}
          onInputChange={handleChange}
          onChange={(e, option) => { if (option) onGameSelect(e, option?.bggId); }}
          isOptionEqualToValue={isOptionEqualToValue}
          renderInput={(params) => (
            <Grid container direction="column">
              <Grid item>
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: isSearching && (
                      <InputAdornment position="end">
                        <CircularProgress size={24} />
                      </InputAdornment>
                    ),
                  }}
                  label="Search Games"
                  variant="outlined"
                  onKeyPress={(e) => { if (e.key === "Enter") e.preventDefault(); }}
                />
              </Grid>
              <Grid item className={leftAlign}>
                <Typography variant="caption" color={isFocused ? "primary.main" : "GrayText"}>Powered by BoardGameGeek</Typography>
              </Grid>
            </Grid>
          )}
          renderOption={(optionProps, option: Pick<Game, "bggId" | "name" | "year">) => (
            <ListItem
              {...optionProps}
              key={`game-typeahead-option-bggid-${option.bggId}`}
              onClick={(e) => onGameSelect(e, option.bggId)}
            >
              <ListItemText primary={option.name} secondary={option.year ? `Year: ${option.year}` : ""} />
            </ListItem>
          )}
        />
      </Grid>
    </Grid>
  );
}
