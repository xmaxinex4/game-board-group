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
import LibraryIcon from "@mui/icons-material/MenuBookTwoTone";

import { selectActiveUser } from "../../user/redux/slice";
import { MeeplePaletteColors } from "../../../theme/meeple-palettes";

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

  const isPollsRoute = useRouteMatch("/polls");
  const isLibraryRoute = useRouteMatch("/library");

  const pollsTabIndex = 1;
  const libraryTabIndex = 2;

  const currentTab = useMemo(() => {
    if (isPollsRoute?.isExact) return pollsTabIndex;
    if (isLibraryRoute?.isExact) return libraryTabIndex;
    return 0;
  }, [isPollsRoute, isLibraryRoute]);

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
                  <PollIcon />
                </Grid>
              </Grid>
            )}
            to="/polls"
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
