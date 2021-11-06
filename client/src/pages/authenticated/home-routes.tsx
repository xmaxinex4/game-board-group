import React from "react";
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

import { MobileTabs } from "../../modules/common/navigation/mobile-tabs";
import { DesktopTabs } from "../../modules/common/navigation/desktop-tabs";
import { selectActiveUser } from "../../redux/active-user-slice";
import { selectedActiveUserGroupMembership } from "../../redux/active-user-group-memberships-slice";
import { NavFooter } from "../../modules/common/navigation/nav-footer";

import { GroupInvite } from "./group-invite";
import { TermsOfService } from "./terms-of-service";
import { PrivacyPolicy } from "./privacy-policy";
import { PageLoadingSpinner } from "../../modules/common/progress/page-loading-spinner";

export interface AuthenticatedHomeRoutesProps {
  isActiveGroupLoading?: boolean;
}

export function AuthenticatedHomeRoutes(props: AuthenticatedHomeRoutesProps): React.ReactElement {
  const { isActiveGroupLoading } = props;
  const drawerWidth = 144;
  const activeUserGroupMembership = useSelector(selectedActiveUserGroupMembership);
  const activeUser = useSelector(selectActiveUser);

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
                    activeUserGroupMembership
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
                              <Route path="/manage-group" component={ManageGroup} />
                              <Route path="/invite/:inviteCode" component={GroupInvite} />
                              <Route exact path="/terms-of-service" component={TermsOfService} />
                              <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                              <Route path="*" component={NotFound} />
                            </Switch>
                          </Grid>
                        </Grid>
                      )
                      : (
                        <Grid container>
                          <Grid item style={{ width: "100%" }}>
                            {isActiveGroupLoading && (
                              <PageLoadingSpinner />
                            )}
                            {!isActiveGroupLoading && (
                              <Switch>
                                <Route path="/account" component={AccountSettings} />
                                <Route path="/invite/:inviteCode" component={GroupInvite} />
                                <Route path="*" component={NoActiveGroup} />
                              </Switch>
                            )}
                          </Grid>
                        </Grid>
                      )
                  }
                </Grid>
                <NavFooter />
              </Grid>
            )
          }
        </>
      </Box>
    </Box>
  );
}
