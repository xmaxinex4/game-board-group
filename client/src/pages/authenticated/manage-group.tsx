import React from "react";
import { useSelector } from "react-redux";

import { Button, Grid } from "@mui/material";

import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { GroupManagementUserListDisplay } from "../../modules/group/group-management-user-list-display";
import { selectActiveGroup } from "../../modules/group/redux/slice";

export function ManageGroup(): React.ReactElement {
  const activeGroup = useSelector(selectActiveGroup);

  const activeGroupMemberships = (activeGroup && activeGroup.members?.length > 0) ? activeGroup.members : [];

  return (
    <TabContentContainer title="Group Members">
      <Grid container item direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <GroupManagementUserListDisplay memberships={activeGroupMemberships} />
        </Grid>
        <Grid item>
          <Button variant="contained">+ Member</Button>
        </Grid>
      </Grid>
    </TabContentContainer>
  );
}
