import React, { useMemo } from "react";
import { Switch, Route } from "react-router";
import { useSelector } from "react-redux";

import { Drawer, Grid, Box } from "@mui/material";

import { Polls } from "./polls";
import { Stats } from "./stats";
import { Library } from "./library";
import { ManageGroup } from "./manage-group";
import { Home } from "./home";

import { NoActiveGroup } from "../../modules/group/no-active-group";
import { NavBar } from "../../modules/common/navigation/nav-bar";
import { MyCollections } from "./my-collections";
import { AccountSettings } from "./account-settings";
import { NotFound } from "../error/not-found";
import { selectActiveUser } from "../../modules/user/redux/slice";
import { selectActiveGroup } from "../../modules/group/redux/slice";
import { MobileTabs } from "../../modules/common/navigation/mobile-tabs";
import { DesktopTabs } from "../../modules/common/navigation/desktop-tabs";

export function AuthenticatedHomeRoutes(): React.ReactElement {
  const drawerWidth = 192;
  const activeUser = useSelector(selectActiveUser);
  const activeGroup = useSelector(selectActiveGroup);

  const isGroupAdmin = useMemo(() => {
    const activeUserActiveGroupMembership = activeUser?.groupMemberships?.find((membership) => membership.group.id === activeGroup?.id);
    return activeUserActiveGroupMembership?.isAdmin || false;
  }, [activeGroup, activeUser]);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="navigation tabs"
      >
        <Drawer
          anchor="top"
          variant="permanent"
          open
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: "100%" },
          }}
        >
          <MobileTabs />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          <DesktopTabs />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={
          {
            flexGrow: 1,
            p: 3,
            width: { xs: `calc(100% - ${drawerWidth}px)` },
            marginTop: { md: "unset", xs: "72px" },
            padding: { md: "24px", xs: "unset" },
          }
        }
      >
        <>
          {
            activeUser && (
              <Grid container>
                <Grid container item direction="column" alignItems="center">
                  <NavBar />
                  {
                    activeGroup
                      ? (
                        <Grid container>
                          <Grid item style={{ width: "100%" }}>
                            <Switch>
                              <Route exact path="/" component={Home} />
                              <Route path="/polls" component={Polls} />
                              <Route path="/library" component={Library} />
                              <Route path="/stats" component={Stats} />
                              <Route path="/my-game-collections" component={MyCollections} />
                              <Route path="/account" component={AccountSettings} />
                              {isGroupAdmin && (
                                <Route path="/manage-group" component={ManageGroup} />
                              )}
                              <Route path="*" component={NotFound} />
                            </Switch>
                          </Grid>
                        </Grid>
                      ) : <NoActiveGroup />
                  }
                </Grid>
              </Grid>
            )
          }
        </>
      </Box>
    </Box>
  );
}
