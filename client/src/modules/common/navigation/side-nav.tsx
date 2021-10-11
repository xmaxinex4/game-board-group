import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";

import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 800,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export function SideNav(): React.ReactElement {
  const { tabs, root } = useStyles();

  const isPollsRoute = useRouteMatch("/polls");
  const isStatsRoute = useRouteMatch("/stats");
  const isLibraryRoute = useRouteMatch("/library");
  const isGroupManageRoute = useRouteMatch("/manage-group");
  const isMyGamesRoute = useRouteMatch("/my-game-collections");

  const pollsTabIndex = 0;
  const statsTabIndex = 1;
  const libraryTabIndex = 2;
  const groupManageTabIndex = 3;
  const myGamesTabIndex = 4;

  const currentTab = useMemo(() => {
    if (isPollsRoute?.isExact) return pollsTabIndex;
    if (isStatsRoute?.isExact) return statsTabIndex;
    if (isLibraryRoute?.isExact) return libraryTabIndex;
    if (isGroupManageRoute?.isExact) return groupManageTabIndex;
    if (isMyGamesRoute?.isExact) return myGamesTabIndex;
    return 0;
  }, [isPollsRoute, isStatsRoute, isLibraryRoute, isGroupManageRoute]);

  // import HowToVoteIcon from '@mui/icons-material/HowToVote'; // for Polls
  // import PieChartIcon from '@mui/icons-material/PieChart'; // for Stats
  // import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'; // for Library
  // Meeple Group for manage group

  return (
    <div className={root}>
      <Tabs
        orientation="vertical"
        value={currentTab}
        className={tabs}
      >
        <Tab component={Link} label="Polls" to="/polls" />
        <Tab component={Link} label="Stats" to="/stats" />
        <Tab component={Link} label="Library" to="/library" />
        <Tab component={Link} label="Group" to="/manage-group" />
        <Tab component={Link} label="Games" to="/my-game-collections" />
      </Tabs>
    </div>
  );
}
