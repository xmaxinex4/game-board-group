import * as React from "react"

import PencilIcon from '@material-ui/icons/Edit';
import { makeStyles } from "@material-ui/styles";
import { Grid, Tooltip, Typography, Avatar, Theme, IconButton } from "@material-ui/core";

import { MeepleIcon } from "../../../Resources";
import { CollectionOwner } from "../../collection";

export interface UserCircleListDisplayProps {
  users: CollectionOwner[];
  onEditUsers?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  meeple: {
    backgroundColor: "inherit"
  },
}));

export const UserCircleListDisplay: React.FunctionComponent<UserCircleListDisplayProps> = ({ users, onEditUsers }) => {
  const { meeple } = useStyles({});

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Typography>Owners:</Typography>
      </Grid>
      {(users && users.length > 0) && users.map((user) => {
        return (
          <Grid item>
            <Tooltip title={user.username} aria-label={user.username}>
              <Avatar className={meeple}>
                <MeepleIcon fill={user.color} />
              </Avatar>
            </Tooltip>
          </Grid>
        )
      })}
      {onEditUsers &&
        <Grid item>
          <IconButton onClick={onEditUsers} color="primary" aria-label="edit owners" component="span">
            <PencilIcon />
          </IconButton>
        </Grid>
      }
    </Grid>
  )
}