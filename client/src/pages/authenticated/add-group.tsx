import React from "react";

import GroupIcon from "@mui/icons-material/GroupsTwoTone";

import {
  Typography,
  Grid,
} from "@mui/material";

import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { CreateGroupForm } from "../../modules/group/create/form";

export interface AddGroupProps {
  noGroup?: boolean;
}

export function AddGroup(props: AddGroupProps): React.ReactElement {
  const { noGroup } = props;

  return (
    <TabContentContainer>
      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={4}>
        {noGroup && (
          <Grid item>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={1}>
              <Grid item>
                <Typography variant="h6">No Groups?</Typography>
              </Grid>
              <Grid item>
                <GroupIcon fontSize="large" color="primary" />
              </Grid>
              <Grid item>
                <Typography>Add a New Group to Get Started!</Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
        {!noGroup && (
          <Grid item>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={1}>
              <Grid item>
                <Typography variant="h6">Add New Group</Typography>
              </Grid>
              <Grid item>
                <GroupIcon fontSize="large" color="primary" />
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item>
          <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
            <Grid item>
              <CreateGroupForm />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TabContentContainer>
  );
}
