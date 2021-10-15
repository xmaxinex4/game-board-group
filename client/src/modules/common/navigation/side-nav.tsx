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
import { selectActiveUser } from "../../user/redux/slice";
import { MeeplePaletteColors } from "../../../theme/meeple-palettes";

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

export interface SideNavProps {
  mobile?: boolean;
}

export function SideNav(props: SideNavProps): React.ReactElement {
  const { mobile } = props;
  const activeUser = useSelector(selectActiveUser);

  // The last 2 digits on a hex represent the alpha value
  const { root, logo } = useStyles({ activeUserColor: activeUser ? `${MeeplePaletteColors[activeUser?.color].main}1E` : "" });

  const isPollsRoute = useRouteMatch("/polls");
  const isStatsRoute = useRouteMatch("/stats");
  const isLibraryRoute = useRouteMatch("/library");
  const isGroupManageRoute = useRouteMatch("/manage-group");
  const isMyGamesRoute = useRouteMatch("/my-game-collections");

  const pollsTabIndex = 1;
  const statsTabIndex = 2;
  const libraryTabIndex = 3;
  const groupManageTabIndex = 4;
  const myGamesTabIndex = 5;

  const currentTab = useMemo(() => {
    if (isPollsRoute?.isExact) return pollsTabIndex;
    if (isStatsRoute?.isExact) return statsTabIndex;
    if (isLibraryRoute?.isExact) return libraryTabIndex;
    if (isGroupManageRoute?.isExact) return groupManageTabIndex;
    if (isMyGamesRoute?.isExact) return myGamesTabIndex;
    return 0;
  }, [isPollsRoute, isStatsRoute, isLibraryRoute, isGroupManageRoute]);

  return (
    <Grid container direction="column" className={mobile ? "" : root}>
      {!mobile && (
        <Grid item className={logo}>
          <Link to="/">
            <img alt="" src={Logo} />
          </Link>
        </Grid>
      )}
      <Grid item>
        <Tabs
          className={mobile ? root : ""}
          orientation={mobile ? "horizontal" : "vertical"}
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
              <Grid container alignItems="center" justifyContent={mobile ? "center" : "flex-end"} spacing={1}>
                <Grid item>
                  <HomeIcon />
                </Grid>
                <Grid item>
                  {mobile ? "" : "Home"}
                </Grid>
              </Grid>
            )}
            to="/"
          />
          <Tab
            component={Link}
            label={(
              <Grid container alignItems="center" justifyContent={mobile ? "center" : "flex-end"} spacing={1}>
                <Grid item>
                  <PollIcon />
                </Grid>
                <Grid item>
                  {mobile ? "" : "Polls"}
                </Grid>
              </Grid>
            )}
            to="/polls"
          />
          <Tab
            component={Link}
            label={(
              <Grid container alignItems="center" justifyContent={mobile ? "center" : "flex-end"} spacing={1}>
                <Grid item>
                  <StatsIcon />
                </Grid>
                <Grid item>
                  {mobile ? "" : "Stats"}
                </Grid>
              </Grid>
            )}
            to="/stats"
          />
          <Tab
            component={Link}
            label={(
              <Grid container alignItems="center" justifyContent={mobile ? "center" : "flex-end"} spacing={1}>
                <Grid item>
                  <LibraryIcon />
                </Grid>
                <Grid item>
                  {mobile ? "" : "Library"}
                </Grid>
              </Grid>
            )}
            to="/library"
          />
          <Tab
            component={Link}
            label={(
              <Grid container alignItems="center" justifyContent={mobile ? "center" : "flex-end"} spacing={1}>
                <Grid item>
                  <GroupIcon />
                </Grid>
                <Grid item>
                  {mobile ? "" : "Group"}
                </Grid>
              </Grid>
            )}
            to="/manage-group"
          />
          <Tab
            component={Link}
            label={(
              <Grid container alignItems="center" justifyContent={mobile ? "center" : "flex-end"} spacing={1}>
                <Grid item>
                  <GamesIcon />
                </Grid>
                <Grid item>
                  {mobile ? "" : "Games"}
                </Grid>
              </Grid>
            )}
            to="/my-game-collections"
          />
        </Tabs>
      </Grid>
    </Grid>
  );
}
