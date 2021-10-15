import React from "react";

import PencilIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Tooltip,
  Avatar,
  IconButton,
} from "@mui/material";

import { Meeple } from "../../images/components/meeple";

import { User } from ".prisma/client";
import { MeeplePaletteColors } from "../../theme/meeple-palettes";

export interface UserCircleListDisplayProps {
  users: User[];
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
      {(users && users.length > 0) && users.map((user) => (
        <Grid item key={`user-cirlce-display-user-id-${user.id}`}>
          <Tooltip title={user.username} aria-label={user.username}>
            <Avatar className={meeple}>
              <Meeple size="icon" fill={MeeplePaletteColors[user.color].main} />
            </Avatar>
          </Tooltip>
        </Grid>
      ))}
      {onEditUsers && (
        <Grid item>
          <IconButton onClick={onEditUsers} color="primary" aria-label="edit owners" component="span">
            <PencilIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
}
