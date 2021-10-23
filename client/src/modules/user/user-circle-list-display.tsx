import React from "react";

import CircleIcon from "@mui/icons-material/Circle";

import {
  Grid,
  Tooltip,
  Avatar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Meeple } from "../../images/components/meeple";
import { UserResponse } from "../../types";
import { MeeplePaletteColors } from "../../theme/meeple-palettes";

export interface UserCircleListDisplayProps {
  users: Omit<UserResponse, "groupMemberships">[];
  onEditUsers?: () => void;
}

const useStyles = makeStyles(() => ({
  meeple: {
    backgroundColor: "inherit",
  },
}));

export function UserCircleListDisplay(props: UserCircleListDisplayProps): React.ReactElement {
  const { users } = props;
  const { meeple } = useStyles();

  return (
    <Grid container spacing={2} alignItems="center">
      {users.map((user) => (
        <>
          <Grid
            item
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
            key={`user-cirlce-desktop-display-user-id-${user.id}`}
          >
            <Tooltip title={user.username} aria-label={user.username}>
              <Avatar className={meeple}>
                <Meeple size="icon" fill={MeeplePaletteColors[user.color].main} />
              </Avatar>
            </Tooltip>
          </Grid>
          <Grid
            item
            sx={{
              display: {
                xs: "block",
                md: "none",
              },
            }}
            key={`user-cirlce-mobile-display-user-id-${user.id}`}
          >
            <Tooltip title={user.username} aria-label={user.username}>
              <CircleIcon sx={{ color: MeeplePaletteColors[user.color].main }} />
            </Tooltip>
          </Grid>
        </>
      ))}
    </Grid>
  );
}
