import React from "react";

import {
  Grid,
  Tooltip,
  Avatar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Meeple } from "../../images/components/meeple";

import { MeeplePaletteColors } from "../../theme/meeple-palettes";
import { UserResponse } from "../../api-types/response-types";

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
        <Grid item key={`user-cirlce-display-user-id-${user.id}`}>
          <Tooltip title={user.username} aria-label={user.username}>
            <Avatar className={meeple}>
              <Meeple size="icon" fill={MeeplePaletteColors[user.color].main} />
            </Avatar>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
}
