import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { generateFilter } from "colorize-filter";

import Menu from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/LogoutTwoTone";
import AccountIcon from "@mui/icons-material/PersonOutlineTwoTone";
import GroupIcon from "@mui/icons-material/GroupsTwoTone";
import GamesIcon from "@mui/icons-material/CasinoTwoTone";
import StatsIcon from "@mui/icons-material/PollTwoTone";
import LibraryIcon from "@mui/icons-material/MenuBookTwoTone";
import HomeIcon from "@mui/icons-material/HomeTwoTone";
import PollIcon from "@mui/icons-material/HowToVoteTwoTone";

import {
  Popover,
  List,
  ListItem,
  ListItemText,
  Grid,
  Avatar,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Meeple } from "../../../images/components/meeple";
import { MeepleMenu } from "../../../images/components/meeple-menu";
import { MeeplePaletteColors } from "../../../theme/meeple-palettes";
import { SitePaletteColors } from "../../../theme/site-palettes";
import { persistor } from "../../../redux/store";
import { selectActiveUser } from "../../../redux/active-user-slice";

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

export function UserNavMenuButton(): React.ReactElement {
  const activeUser = useSelector(selectActiveUser);

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
              <AccountIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem
            button
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleClose}
            component={Link}
            className={listLink}
            to="/"
          >
            <Grid container>
              <Grid item>
                <ListItemIcon>
                  <HomeIcon color="primary" />
                </ListItemIcon>
              </Grid>
              <Grid item>
                <ListItemText primary="Home" />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem
            button
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleClose}
            component={Link}
            className={listLink}
            to="/polls"
          >
            <Grid container>
              <Grid item>
                <ListItemIcon>
                  <PollIcon color="primary" />
                </ListItemIcon>
              </Grid>
              <Grid item>
                <ListItemText primary="Polls" />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem
            button
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleClose}
            component={Link}
            className={listLink}
            to="/library"
          >
            <Grid container>
              <Grid item>
                <ListItemIcon>
                  <LibraryIcon color="primary" />
                </ListItemIcon>
              </Grid>
              <Grid item>
                <ListItemText primary="Library" />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem
            button
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleClose}
            component={Link}
            className={listLink}
            to="/stats"
          >
            <Grid container>
              <Grid item>
                <ListItemIcon>
                  <StatsIcon color="primary" />
                </ListItemIcon>
              </Grid>
              <Grid item>
                <ListItemText primary="Stats" />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem
            button
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleClose}
            component={Link}
            className={listLink}
            to="/my-game-collections"
          >
            <Grid container>
              <Grid item>
                <ListItemIcon>
                  <GamesIcon color="primary" />
                </ListItemIcon>
              </Grid>
              <Grid item>
                <ListItemText primary="Games" />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem
            button
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleClose}
            component={Link}
            className={listLink}
            to="/manage-group"
          >
            <Grid container>
              <Grid item>
                <ListItemIcon>
                  <GroupIcon color="primary" />
                </ListItemIcon>
              </Grid>
              <Grid item>
                <ListItemText primary="Group" />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <LogoutIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}
