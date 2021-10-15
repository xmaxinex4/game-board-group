import React from "react";
import { Switch, Route } from "react-router";
import { useSelector } from "react-redux";

import { Drawer, Grid, Box } from "@mui/material";
// import { makeStyles } from "@mui/styles";

import { Polls } from "./polls";
import { Stats } from "./stats";
import { Library } from "./library";
import { ManageGroup } from "./manage-group";
import { Home } from "./home";

import { SideNav } from "../../modules/common/navigation/side-nav";
import { NoActiveGroup } from "../../modules/group/no-active-group";
import { NavBar } from "../../modules/common/navigation/nav-bar";
import { MyCollections } from "./my-collections";
import { AccountSettings } from "./account-settings";
import { NotFound } from "../error/not-found";
import { selectActiveUser } from "../../modules/user/redux/slice";
import { selectActiveGroup } from "../../modules/group/redux/slice";

export function AuthenticatedHomeRoutes(): React.ReactElement {
  const drawerWidth = 192;
  const activeUser = useSelector(selectActiveUser);
  const activeGroup = useSelector(selectActiveGroup);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          anchor="top"
          variant="permanent"
          open
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: "100%" },
          }}
        >
          <SideNav mobile />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          <SideNav />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={
          {
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            marginTop: { sm: "unset", xs: "50px" },
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
                          <Grid item>
                            <Switch>
                              <Route exact path="/" component={Home} />
                              <Route path="/polls" component={Polls} />
                              <Route path="/stats" component={Stats} />
                              <Route path="/library" component={Library} />
                              <Route path="/manage-group" component={ManageGroup} />
                              <Route exact path="/my-game-collections" component={MyCollections} />
                              <Route path="/account" component={AccountSettings} />
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
