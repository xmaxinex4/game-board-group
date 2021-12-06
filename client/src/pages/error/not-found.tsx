import React from "react";

import MoodBadTwoToneIcon from "@mui/icons-material/MoodBadTwoTone";

import { Typography, Grid } from "@mui/material";
import { TabContentContainer } from "../../modules/common/layout/tab-content-container";

export function NotFound(): React.ReactElement {
  return (
    <TabContentContainer>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
          <MoodBadTwoToneIcon color="primary" sx={{ fontSize: 80 }} />
        </Grid>
        <Grid item>
          <Typography>
            Oops! Page Not Found.
          </Typography>
        </Grid>
      </Grid>
    </TabContentContainer>
  );
}
