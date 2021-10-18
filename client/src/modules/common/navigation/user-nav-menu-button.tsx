import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { mdiAccount, mdiLogout } from "@mdi/js";
import Menu from "@mui/icons-material/Menu";
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
import { SitePaletteColors } from "../../../theme/site-palettes";
import { selectActiveUser } from "../../user/redux/slice";
import { persistor } from "../../../redux/store";

const useStyles = makeStyles(() => ({
  meepleAvatar: {
    backgroundColor: "#fff",
    margin: 10,
    width: 60,
    height: 60,
  },
  listLink: {
    textDecoration: "none",
  },
}));

export interface UserNavMenuProps {
}

export function UserNavMenuButton(): React.ReactElement {
  const activeUser = useSelector(selectActiveUser);
  const theme = useTheme<Theme>();

  const { meepleAvatar, listLink } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    persistor.purge();
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
      <IconButton sx={{ display: { xs: "none", md: "block" } }} color="primary" size="medium" onClick={handleClick}>
        <MeepleMenu colorFilter={meepleCustomColorFilter} size={32} fill={userColor} />
      </IconButton>
      <IconButton sx={{ display: { xs: "block", md: "none" } }} color="primary" size="medium" onClick={handleClick}>
        <Menu sx={{ color: "primary.main", fontSize: 32 }} />
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
                <Avatar className={meepleAvatar}>
                  <Meeple fill={userColor} />
                </Avatar>
              </Grid>
              <Grid item>
                <ListItemText primary={activeUser?.username} secondary={activeUser?.email} />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem button onClick={handleClose} component={Link} className={listLink} to="/account">
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
