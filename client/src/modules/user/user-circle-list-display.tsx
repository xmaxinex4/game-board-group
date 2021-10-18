import React from "react";

import {
  Grid,
  Tooltip,
  Avatar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Meeple } from "../../images/components/meeple";

import { MeeplePaletteColors } from "../../theme/meeple-palettes";
import { UserResponse } from "../../api-types/response-types";

export interface UserCircleListDisplayProps {
  users: Omit<UserResponse, "groupMemberships">[];
  onEditUsers?: () => void;
  showNames?: boolean;
}

const useStyles = makeStyles(() => ({
  meeple: {
    backgroundColor: "inherit",
  },
}));

export function UserCircleListDisplay(props: UserCircleListDisplayProps): React.ReactElement {
  const { users, showNames } = props;
  const { meeple } = useStyles();

  return (
    <Grid container spacing={2} alignItems="center">
      {users.map((user) => (
        <Grid container item spacing={1} alignItems="center">
          <Grid item key={`user-cirlce-display-user-id-${user.id}`}>
            {showNames
              ? (
                <Avatar className={meeple}>
                  <Meeple size="icon" fill={MeeplePaletteColors[user.color].main} />
                </Avatar>
              )
              : (
                <Tooltip title={user.username} aria-label={user.username}>
                  <Avatar className={meeple}>
                    <Meeple size="icon" fill={MeeplePaletteColors[user.color].main} />
                  </Avatar>
                </Tooltip>
              )}
          </Grid>
          {showNames && (
            <Grid item>
              <Typography>{user.username}</Typography>
            </Grid>
          )}
        </Grid>
      ))}
    </Grid>
  );
}
