import React from "react";

import CircleIcon from "@mui/icons-material/Circle";
import PencilIcon from "@mui/icons-material/EditTwoTone";

import {
  Grid,
  Tooltip,
  Avatar,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { UserResponse } from "../../../../src/types/types";

import { Meeple } from "../../images/components/meeple";
import { MeeplePaletteColors } from "../../theme/meeple-palettes";

export interface UserCircleListDisplayProps {
  users: UserResponse[];
  onEditUsers?: () => void;
}

const useStyles = makeStyles(() => ({
  meeple: {
    backgroundColor: "inherit",
  },
}));

export function UserCircleListDisplay(props: UserCircleListDisplayProps): React.ReactElement {
  const { users, onEditUsers } = props;
  const { meeple } = useStyles();

  return (
    <Grid container spacing={2} alignItems="center">
      {users && users.map((user) => (
        <Grid item key={`user-display-${user.id}`}>
          <Grid container>
            <Grid
              item
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
              key={`user-circle-desktop-display-user-id-${user.id}`}
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
          </Grid>
        </Grid>
      ))}
      {onEditUsers && (
        <Grid item>
          <IconButton onClick={onEditUsers} color="primary" aria-label="edit games" component="span">
            <PencilIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
}
