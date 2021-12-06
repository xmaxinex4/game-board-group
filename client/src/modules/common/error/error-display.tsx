import React from "react";

import MoodBadTwoToneIcon from "@mui/icons-material/MoodBadTwoTone";

import {
  Grid,
  Typography,
} from "@mui/material";

export interface ErrorDisplayProps {
  error?: React.ReactNode;
}

export function ErrorDisplay(props: ErrorDisplayProps): React.ReactElement {
  const { error } = props;

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
      <Grid item>
        <MoodBadTwoToneIcon color="primary" sx={{ fontSize: 80 }} />
      </Grid>
      <Grid item>
        {error || (
          <Typography>
            Oops! Something went wrong.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
