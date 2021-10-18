import React from "react";

import ChevronLeft from "@mui/icons-material/ChevronLeft";

import { Grid, Typography } from "@mui/material";
import { SiteLink } from "../../modules/common/navigation/site-link";

export function ForgotPassword(): React.ReactElement {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={12}>
        <Typography>
          <SiteLink icon={ChevronLeft} text="Back" to="/" />
        </Typography>
      </Grid>
      <Grid item>
        <Typography align="center">Under Construction</Typography>
      </Grid>
    </Grid>
  );
}
