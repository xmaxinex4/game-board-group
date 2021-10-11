import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import { mdiAccount, mdiLogout } from "@mdi/js";
import Icon from "@mdi/react";

import { generateFilter } from "colorize-filter";

import {
  Popover,
  List,
  ListItem,
  ListItemText,
  Grid,
  Avatar,
  ListItemIcon,
  IconButton,
  Theme,
} from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";

import { Meeple } from "../../../images/components/meeple";
import { MeepleMenu } from "../../../images/components/meeple-menu";
import { MeeplePaletteColors } from "../../../theme/meeple-palettes";
import { ActiveUserContext } from "../../../contexts/active-user-context";
import { SitePaletteColors } from "../../../theme/site-palettes";

const useStyles = makeStyles(() => ({
  meepleButton: {
    backgroundColor: "none",
  },
  meepleAvatar: {
    backgroundColor: "#fff",
    margin: 10,
    width: 60,
    height: 60,
  },
}));

export interface UserNavMenuProps {
}

export function UserNavMenuButton(): React.ReactElement {
  const { activeUser } = React.useContext(ActiveUserContext);
  const theme = useTheme<Theme>();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    window.location.href = "/";
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const userColor = useMemo(() => {
    if (activeUser) return MeeplePaletteColors[activeUser.color].main;
    return SitePaletteColors.Primary.main;
  }, [activeUser]);

  const meepleCustomColorFilter = generateFilter(userColor);

  return (
    <div>
      <IconButton color="inherit" size="medium" onClick={handleClick}>
        <MeepleMenu colorFilter={meepleCustomColorFilter} size={32} fill={userColor} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List component="nav">
          <ListItem>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              <Grid item>
                <Avatar className={classes.meepleAvatar}>
                  <Meeple fill={userColor} />
                </Avatar>
              </Grid>
              <Grid item>
                <ListItemText primary={activeUser?.username} secondary={activeUser?.email} />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem component={Link} to="/account">
            <ListItemIcon>
              <Icon path={mdiAccount} color={theme.palette.primary.main} size={1} />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <Icon path={mdiLogout} color={theme.palette.primary.main} size={1} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}
