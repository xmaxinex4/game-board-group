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
import GamesIcon from "@mui/icons-material/CasinoTwoTone";
import LibraryIcon from "@mui/icons-material/MenuBookTwoTone";

import { MeeplePaletteColors } from "../../../theme/meeple-palettes";
import { selectActiveUser } from "../../../redux/active-user-slice";

const useStyles = makeStyles<Theme, { activeUserColor?: string; }>((theme: Theme) => ({
  root: ({ activeUserColor }) => ({
    flexGrow: 1,
    backgroundColor: activeUserColor || theme.palette.background.paper,
  }),
}));

export interface MobileTabsProps {
}

export function MobileTabs(): React.ReactElement {
  const activeUser = useSelector(selectActiveUser);

  // The last 2 digits on a hex represent the alpha value
  const { root } = useStyles({ activeUserColor: activeUser ? `${MeeplePaletteColors[activeUser?.color].main}1E` : "" });

  const isGamesRoute = useRouteMatch("/my-game-collections");
  const isLibraryRoute = useRouteMatch("/library");

  const gamesTabIndex = 1;
  const libraryTabIndex = 2;

  const currentTab = useMemo(() => {
    if (isGamesRoute?.isExact) return gamesTabIndex;
    if (isLibraryRoute?.isExact) return libraryTabIndex;
    return 0;
  }, [isGamesRoute, isLibraryRoute]);

  return (
    <Grid container direction="column">
      <Grid item>
        <Tabs
          className={root}
          orientation="horizontal"
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
              <Grid container alignItems="center" justifyContent="center" spacing={1}>
                <Grid item>
                  <HomeIcon />
                </Grid>
              </Grid>
            )}
            to="/"
          />
          <Tab
            component={Link}
            label={(
              <Grid container alignItems="center" justifyContent="center" spacing={1}>
                <Grid item>
                  <GamesIcon />
                </Grid>
              </Grid>
            )}
            to="/my-game-collections"
          />
          <Tab
            component={Link}
            label={(
              <Grid container alignItems="center" justifyContent="center" spacing={1}>
                <Grid item>
                  <LibraryIcon />
                </Grid>
              </Grid>
            )}
            to="/library"
          />
        </Tabs>
      </Grid>
    </Grid>
  );
}
