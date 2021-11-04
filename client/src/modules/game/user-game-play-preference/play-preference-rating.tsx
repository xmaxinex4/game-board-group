/* eslint-disable react/jsx-props-no-spreading */

import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfiedTwoTone";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfiedTwoTone";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfiedTwoTone";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfiedTwoTone";
import SentimentNeutralTwoToneIcon from "@mui/icons-material/SentimentNeutralTwoTone";

import {
  Box,
  Grid,
  IconContainerProps,
  Rating,
  Typography,
  useTheme,
  Theme,
} from "@mui/material";

import { selectActiveUserPlayPreferences } from "../../../redux/active-user-play-preferences-slice";
import { useUpsertUserGamePlayPreference } from "./endpoint-hooks";

const PlayPreferenceRatingIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon sx={{ fontSize: 32 }} />,
    label: "Never Play",
  },
  2: {
    icon: <SentimentDissatisfiedIcon sx={{ fontSize: 32 }} />,
    label: "Rarely Play",
  },
  3: {
    icon: <SentimentNeutralTwoToneIcon sx={{ fontSize: 32 }} />,
    label: "Sometimes Play",
  },
  4: {
    icon: <SentimentSatisfiedIcon sx={{ fontSize: 32 }} />,
    label: "Usually Play",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon sx={{ fontSize: 32 }} />,
    label: "Always Play",
  },
};

function PlayPreferenceRatingIconContainer(props: IconContainerProps) {
  const { value, ...other } = props;

  return (
    <Box sx={{ padding: "4px" }}>
      <span {...other}>{PlayPreferenceRatingIcons[value].icon}</span>
    </Box>
  );
}

function getPreferenceStringValue(value: number) {
  switch (value) {
    case 1: return "Never";
    case 2: return "Rarely";
    case 3: return "Sometimes";
    case 4: return "Usually";
    case 5: return "Always";
    default: return "Never";
  }
}

export interface PlayPreferenceRatingProps {
  bggId: string,
}

export function PlayPreferenceRating(props: PlayPreferenceRatingProps): React.ReactElement {
  const { bggId } = props;

  const activeUserPlayPreferences = useSelector(selectActiveUserPlayPreferences);
  const userPlayPreferenceByBggId = useMemo(
    () => activeUserPlayPreferences.find((preference) => preference.game.bggId === bggId),
    [activeUserPlayPreferences],
  );

  const [savingPlayPreference, setSavingPlayPreference] = useState(false);
  const { upsertUserGamePlayPreference, deleteUserGamePlayPreference } = useUpsertUserGamePlayPreference();

  const theme = useTheme<Theme>();

  const intitialPreferenceValue = useMemo(() => {
    switch (userPlayPreferenceByBggId?.preference) {
      case "Never": return 1;
      case "Rarely": return 2;
      case "Sometimes": return 3;
      case "Usually": return 4;
      case "Always": return 5;
      default: return -1;
    }
  }, [userPlayPreferenceByBggId]);

  const [ratingValue, setRatingValue] = useState<number | null>(intitialPreferenceValue);
  const [hover, setHover] = useState(-1);

  const onRatingChange = useCallback((event: React.SyntheticEvent<Element, Event>, newValue: number | null) => {
    if (newValue) {
      upsertUserGamePlayPreference({
        gamePlayPreference: userPlayPreferenceByBggId ? {
          ...userPlayPreferenceByBggId,
          preference: getPreferenceStringValue(newValue),
        } : {
          preference: getPreferenceStringValue(newValue),
          game: {
            bggId,
          },
        },
        onUserGamePlayPreferenceUpserted: () => setSavingPlayPreference(false),
        setIsLoading: setSavingPlayPreference,
      });
    } else if (userPlayPreferenceByBggId) {
      deleteUserGamePlayPreference({
        gamePlayPreferenceId: userPlayPreferenceByBggId.id,
        onUserGamePlayPreferenceDeleted: () => setSavingPlayPreference(false),
        setIsLoading: setSavingPlayPreference,
      });
    }

    setRatingValue(newValue);
  }, []);

  const onRatingHover = useCallback((event: React.SyntheticEvent<Element, Event>, newHover: number) => {
    setHover(newHover);
  }, []);

  const labels: { [index: string]: string; } = {
    1: "Never Play",
    2: "Rarely Play",
    3: "Sometimes Play",
    4: "Usually Play",
    5: "Always Play",
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="subtitle2">
          My Play Preference
        </Typography>
      </Grid>
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Rating
              disabled={savingPlayPreference}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: theme.palette.primary.main,
                },
              }}
              size="large"
              highlightSelectedOnly
              name="my-play-preference"
              value={ratingValue}
              precision={1}
              onChange={onRatingChange}
              onChangeActive={onRatingHover}
              IconContainerComponent={PlayPreferenceRatingIconContainer}
            />
          </Grid>
          <Grid item>
            {ratingValue !== null && (
              <Typography>{labels[hover !== -1 ? hover : ratingValue]}</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
