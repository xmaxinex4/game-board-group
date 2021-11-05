import React from "react";

import CircleIcon from "@mui/icons-material/Circle";
import PencilIcon from "@mui/icons-material/EditTwoTone";

import {
  Grid,
  Tooltip,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { UserResponse } from "../../../../src/types/types";

import { Meeple } from "../../images/components/meeple";
import { MeeplePaletteColors } from "../../theme/meeple-palettes";

export interface UserCircleListDisplayProps {
  users: UserResponse[];
  onEditUsers?: () => void;
  verticalNames?: boolean;
  useLetterAvatars?: boolean;
}

const useStyles = makeStyles(() => ({
  meeple: {
    backgroundColor: "inherit",
  },
}));

export function UserCircleListDisplay(props: UserCircleListDisplayProps): React.ReactElement {
  const {
    users,
    onEditUsers,
    verticalNames,
    useLetterAvatars,
  } = props;
  const { meeple } = useStyles();

  return (
    <Grid container direction={verticalNames ? "column" : "row"} spacing={2} alignItems={verticalNames ? "flex-start" : "center"}>
      {users && users.map((user) => (
        <Grid item key={`user-display-${user.id}`}>
          <Grid container alignItems="center" spacing={1}>
            {useLetterAvatars && (
              <Grid
                item
                key={`user-circle-letter-avatar-display-user-id-${user.id}`}
              >
                <Tooltip title={user.username} aria-label={user.username}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: MeeplePaletteColors[user.color].main }}>
                    {user.username.substr(0, 2)}
                  </Avatar>
                </Tooltip>
              </Grid>
            )}
            {!useLetterAvatars && (
              <>
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
                  key={`user-circle-mobile-display-user-id-${user.id}`}
                >
                  <Tooltip title={user.username} aria-label={user.username}>
                    <CircleIcon sx={{ color: MeeplePaletteColors[user.color].main }} />
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Typography>{user.username}</Typography>
                </Grid>
              </>
            )}
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
