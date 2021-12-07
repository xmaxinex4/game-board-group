import React from "react";
import { useSelector } from "react-redux";

import {
  Divider,
  Grid,
  Link,
  Typography,
  Theme,
} from "@mui/material";
import { useTheme } from "@mui/styles";

import { SiteLink } from "./site-link";
import { selectActiveUser } from "../../../redux/active-user-slice";
import { MeeplePaletteColors } from "../../../theme/meeple-palettes";

export function NavFooter(): React.ReactElement {
  const activeUser = useSelector(selectActiveUser);
  const theme = useTheme<Theme>();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        bottom: 0,
        width: "100%",
        position: "relative",
        marginTop: "48px",
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
                  color: activeUser ? MeeplePaletteColors[activeUser.color].dark : theme.palette.primary.main,
                }}
              />
            </Grid>
            <Grid item>
              <SiteLink
                to="/terms-and-conditions"
                text="Terms and Conditions"
                typographyProps={{
                  variant: "subtitle2",
                  color: activeUser ? MeeplePaletteColors[activeUser.color].dark : theme.palette.primary.main,
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
                  color={activeUser ? MeeplePaletteColors[activeUser.color].dark : theme.palette.primary.main}
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
