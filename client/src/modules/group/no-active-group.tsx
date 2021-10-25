import React from "react";

import GroupIcon from "@mui/icons-material/GroupsTwoTone";

import {
  Typography,
  Grid,
} from "@mui/material";

import { TabContentContainer } from "../common/layout/tab-content-container";

import { CreateGroupForm } from "./create/form";

export function NoActiveGroup(): React.ReactElement {
  return (
    <TabContentContainer>
      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={4}>
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
