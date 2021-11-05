/* eslint-disable react/jsx-props-no-spreading */

import React, { useMemo } from "react";

import RatingIcon from "@mui/icons-material/PanoramaHorizontalSelectTwoTone";

import {
  Box,
  Grid,
  IconContainerProps,
  Rating,
  Typography,
  useTheme,
  Theme,
} from "@mui/material";
import { MeeplePaletteColors } from "../../theme/meeple-palettes";

function GameComplexityIconContainer(props: IconContainerProps) {
  const { value, ...other } = props;

  return (
    <Box sx={{ padding: "4px" }}>
      <span {...other}><RatingIcon sx={{ fontSize: { xs: 24, sm: 32 } }} /></span>
    </Box>
  );
}

export interface GameComplexityRatingProps {
  complexity: number,
}

export function GameComplexityRating(props: GameComplexityRatingProps): React.ReactElement {
  const { complexity } = props;
  const theme = useTheme<Theme>();

  const complexityFillColor = useMemo(() => {
    if (complexity < 2) return theme.palette.success.main;
    if (complexity < 4) return MeeplePaletteColors.Merigold.main;
    if (complexity <= 5) return theme.palette.error.main;
    return theme.palette.primary.main;
  }, [complexity]);

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography>
          Complexity
        </Typography>
      </Grid>
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Rating
              readOnly
              sx={{
                "& .MuiRating-iconFilled": {
                  color: complexityFillColor,
                },
              }}
              name="game-complexity"
              value={complexity}
              precision={0.25}
              IconContainerComponent={GameComplexityIconContainer}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
