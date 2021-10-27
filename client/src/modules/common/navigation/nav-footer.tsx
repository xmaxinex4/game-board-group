import React from "react";

import {
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import { SiteLink } from "./site-link";

export function NavFooter(): React.ReactElement {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        bottom: 0,
        marginTop: "250px",
        width: "100%",
      }}
    >
      <Grid item sx={{ width: "100%" }}>
        <Divider variant="middle" />
      </Grid>
      <Grid item container sx={{ padding: "24px" }} justifyContent="space-between">
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="subtitle2">
                <SiteLink to="/privacy-policy" text="Privacy Policy" />
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                <SiteLink to="/terms-of-service" text="Terms of Service" />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" spacing={0.5}>
            <Grid item>
              <Typography color="GrayText" variant="subtitle2">
                Game Images and Details Powered By
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                <Link href="https://boardgamegeek.com/">BoardGameGeek</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
