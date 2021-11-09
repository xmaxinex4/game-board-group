import React from "react";
import { useSelector } from "react-redux";

import {
  Grid,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/styles";

import { Meeple } from "../../images/components/meeple";
import { selectActiveUser } from "../../redux/active-user-slice";

export function ActiveUserInfoDisplay(): React.ReactElement {
  const theme = useTheme<Theme>();
  const activeUser = useSelector(selectActiveUser);
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      {isMdUp && (
        <Grid item>
          <Meeple size={75} fill={theme.palette.primary.main} />
        </Grid>
      )}
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h6">
              {activeUser?.username}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" color={theme.palette.grey[600]}>
              {activeUser?.email}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
