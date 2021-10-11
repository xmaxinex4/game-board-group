import React, { useCallback, useState } from "react";

import {
  Button,
  Typography,
  Grid,
} from "@mui/material";

import { TabContentContainer } from "../common/layout/tab-content-container";

import { CreateGroupForm } from "./create/form";

export function NoActiveGroup(): React.ReactElement {
  const [showAddGroupForm, setShowAddGroupForm] = useState(false);

  const showForm = useCallback(() => setShowAddGroupForm(true), [setShowAddGroupForm]);

  return (
    <TabContentContainer>
      {showAddGroupForm ? (
        <Grid item>
          <CreateGroupForm />
        </Grid>
      ) : (
        <>
          <Grid container item direction="column" alignItems="center" spacing={1}>
            <Grid item>
              <Typography>No Groups?</Typography>
            </Grid>
            <Grid item>
              <Typography>Add a New Group to Get Started!</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Button onClick={showForm} variant="outlined">+ Add Group</Button>
          </Grid>
        </>
      )}
    </TabContentContainer>
  );
}
