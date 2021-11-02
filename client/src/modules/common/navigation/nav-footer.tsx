import React from "react";
import { useSelector } from "react-redux";

import {
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import { SiteLink } from "./site-link";
import { selectActiveUser } from "../../../redux/active-user-slice";
import { MeeplePaletteColors } from "../../../theme/meeple-palettes";

export function NavFooter(): React.ReactElement {
  const activeUser = useSelector(selectActiveUser);

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
              <SiteLink
                to="/privacy-policy"
                text="Privacy Policy"
                typographyProps={{
                  variant: "subtitle2",
                  color: activeUser ? MeeplePaletteColors[activeUser.color].dark : "default",
                }}
              />
            </Grid>
            <Grid item>
              <SiteLink
                to="/terms-of-service"
                text="Terms of Service"
                typographyProps={{
                  variant: "subtitle2",
                  color: activeUser ? MeeplePaletteColors[activeUser.color].dark : "default",
                }}
              />
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
                <Link
                  href="https://boardgamegeek.com/"
                  color={activeUser ? MeeplePaletteColors[activeUser.color].dark : "default"}
                >
                  BoardGameGeek
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
