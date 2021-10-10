import React, { useContext, useMemo } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

import {
  Typography,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";

import { ActiveUserContext } from "../../../contexts/active-user-context";

import { MyGroups } from "../my-groups";
import { MyCollections } from "../my-collections";
import { TabContentContainer } from "../../../modules/common/layout/tab-content-container";

export function AccountRoutes(): React.ReactElement {
  const { activeUser } = useContext(ActiveUserContext);

  const isAccountGroupsRoute = useRouteMatch("/account/groups");
  const isAccountCollectionsRoute = useRouteMatch("/account/collections");

  const accountTabIndex = 0;
  const collectionsTabIndex = 1;
  const groupsTabIndex = 2;

  const currentTab = useMemo(() => {
    if (isAccountCollectionsRoute?.isExact) return collectionsTabIndex;
    if (isAccountGroupsRoute?.isExact) return groupsTabIndex;
    return accountTabIndex;
  }, [isAccountGroupsRoute, isAccountCollectionsRoute]);

  return (
    <TabContentContainer>
      <Grid container item direction="column">
        <Grid item>
          Account
        </Grid>
        <Grid item>
          <Tabs
            value={currentTab}
          >
            <Tab component={Link} label="Account Settings" to="/account" />
            <Tab component={Link} label="My Collections" to="/account/collections" />
            <Tab component={Link} label="My Groups" to="/account/groups" />
          </Tabs>
        </Grid>
        <Switch>
          <Route exact path="/">
            <Typography>
              {
                activeUser?.username
              }
              Account
            </Typography>
          </Route>
          <Route exact path="/collections" component={MyCollections} />
          <Route exact path="/collections" component={MyCollections} />
          <Route exact path="/groups" component={MyGroups} />
        </Switch>
      </Grid>
    </TabContentContainer>
  );
}
