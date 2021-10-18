import React from "react";
import { useSelector } from "react-redux";

import { Button, Grid, Typography } from "@mui/material";

import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { GroupManagementUserListDisplay } from "../../modules/group/group-management-user-list-display";
import { selectActiveGroup } from "../../modules/group/redux/slice";

export function ManageGroup(): React.ReactElement {
  const activeGroup = useSelector(selectActiveGroup);

  const activeGroupMemberships = (activeGroup && activeGroup.members?.length > 0) ? activeGroup.members : [];

  return (
    <TabContentContainer title={`Managing ${activeGroup?.name}`}>
      <Grid container item direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <Typography>Group Members</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <GroupManagementUserListDisplay memberships={activeGroupMemberships} />
      </Grid>
      <Grid item>
        <Button variant="outlined">+ Member</Button>
      </Grid>
    </TabContentContainer>
  );
}
