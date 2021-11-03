/* eslint-disable react/jsx-props-no-spreading */

import React, { useMemo, useState } from "react";

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

import { UserPlayPreferenceResponse } from "../../../../src/types/types";

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

export interface PlayPreferenceRatingProps {
  userPlayPreference?: UserPlayPreferenceResponse;
}

export function PlayPreferenceRating(props: PlayPreferenceRatingProps): React.ReactElement {
  const { userPlayPreference } = props;

  const theme = useTheme<Theme>();

  const intitialPreferenceValue = useMemo(() => {
    switch (userPlayPreference?.preference) {
      case "Never": return 1;
      case "Rarely": return 2;
      case "Sometimes": return 3;
      case "Usually": return 4;
      case "Always": return 5;
      default: return -1;
    }
  }, [userPlayPreference]);

  const [value, setValue] = useState<number | null>(2);
  const [hover, setHover] = useState(intitialPreferenceValue);

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
              sx={{
                "& .MuiRating-iconFilled": {
                  color: theme.palette.primary.main,
                },
              }}
              size="large"
              highlightSelectedOnly
              name="my-play-preference"
              value={value}
              precision={1}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              IconContainerComponent={PlayPreferenceRatingIconContainer}
            />
          </Grid>
          <Grid item>
            {value !== null && (
              <Typography>{labels[hover !== -1 ? hover : value]}</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
