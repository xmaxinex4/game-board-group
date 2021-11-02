import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { useSelector } from "react-redux";

import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid } from "@mui/material";

import HomeIcon from "@mui/icons-material/HomeTwoTone";
import PollIcon from "@mui/icons-material/HowToVoteTwoTone";
import GroupIcon from "@mui/icons-material/GroupsTwoTone";
import GamesIcon from "@mui/icons-material/CasinoTwoTone";
import StatsIcon from "@mui/icons-material/PollTwoTone";
import LibraryIcon from "@mui/icons-material/MenuBookTwoTone";

import Logo from "../../../images/png/logo.png";
import { MeeplePaletteColors } from "../../../theme/meeple-palettes";
import { selectActiveUser } from "../../../redux/active-user-slice";

const useStyles = makeStyles<Theme, { activeUserColor?: string; }>((theme: Theme) => ({
  root: ({ activeUserColor }) => ({
    flexGrow: 1,
    backgroundColor: activeUserColor || theme.palette.background.paper,
  }),
  logo: {
    padding: theme.spacing(2),
    marginBottom: `-${theme.spacing(3)}`,
  },
}));

export interface DesktopTabsProps {
}

export function DesktopTabs(): React.ReactElement {
  const activeUser = useSelector(selectActiveUser);

  // The last 2 digits on a hex represent the alpha value
  const { root, logo } = useStyles({ activeUserColor: activeUser ? `${MeeplePaletteColors[activeUser?.color].main}4B` : "" });

  const isPollsRoute = useRouteMatch("/polls");
  const isLibraryRoute = useRouteMatch("/library");
  const isStatsRoute = useRouteMatch("/stats");
  const isMyGamesRoute = useRouteMatch("/my-game-collections");
  const isGroupManageRoute = useRouteMatch("/manage-group");

  const pollsTabIndex = 1;
  const libraryTabIndex = 2;
  const statsTabIndex = 3;
  const myGamesTabIndex = 4;
  const groupManageTabIndex = 5;

  const currentTab = useMemo(() => {
    if (isPollsRoute?.isExact) return pollsTabIndex;
    if (isStatsRoute?.isExact) return statsTabIndex;
    if (isLibraryRoute?.isExact) return libraryTabIndex;
    if (isGroupManageRoute?.isExact) return groupManageTabIndex;
    if (isMyGamesRoute?.isExact) return myGamesTabIndex;
    return 0;
  }, [isPollsRoute, isStatsRoute, isLibraryRoute, isGroupManageRoute]);

  return (
    <Grid container direction="column" className={root}>
      <Grid item className={logo}>
        <Link to="/">
          <img alt="" src={Logo} />
        </Link>
      </Grid>
      <Grid item>
        <Tabs
          orientation="vertical"
          value={currentTab}
          sx={{
            "& .MuiTabs-flexContainer": {
              justifyContent: "space-around",
            },
          }}
        >
          <Tab
            component={Link}
            label={(
              <Grid container alignItems="center" justifyContent="flex-end" spacing={1}>
                <Grid item>
                  <HomeIcon />
                </Grid>
                <Grid item>Home</Grid>
              </Grid>
            )}
            to="/"
          />
          <Tab
            component={Link}
            label={(
              <Grid container alignItems="center" justifyContent="flex-end" spacing={1}>
                <Grid item>
                  <PollIcon />
                </Grid>
                <Grid item>Polls</Grid>
              </Grid>
            )}
            to="/polls"
          />
          <Tab
            component={Link}
            label={(
              <Grid container alignItems="center" justifyContent="flex-end" spacing={1}>
                <Grid item>
                  <LibraryIcon />
                </Grid>
                <Grid item>Library</Grid>
              </Grid>
            )}
            to="/library"
          />
          <Tab
            component={Link}
            label={(
              <Grid container alignItems="center" justifyContent="flex-end" spacing={1}>
                <Grid item>
                  <StatsIcon />
                </Grid>
                <Grid item>Stats</Grid>
              </Grid>
            )}
            to="/stats"
          />
          <Tab
            component={Link}
            label={(
              <Grid container alignItems="center" justifyContent="flex-end" spacing={1}>
                <Grid item>
                  <GamesIcon />
                </Grid>
                <Grid item>Games</Grid>
              </Grid>
            )}
            to="/my-game-collections"
          />
          <Tab
            component={Link}
            label={(
              <Grid container alignItems="center" justifyContent="flex-end" spacing={1}>
                <Grid item>
                  <GroupIcon />
                </Grid>
                <Grid item>Group</Grid>
              </Grid>
            )}
            to="/manage-group"
          />
        </Tabs>
      </Grid>
    </Grid>
  );
}
