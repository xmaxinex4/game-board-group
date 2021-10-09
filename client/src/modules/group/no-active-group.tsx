import React, { useCallback, useState } from "react";

import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { makeStyles } from "@mui/styles";

import {
  Button,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { CreateGroupForm } from "./create/form";

const useStyles = makeStyles({
  gridContainerPadding: {
    paddingTop: 150,
  },
});

export function NoActiveGroup(): React.ReactElement {
  const { gridContainerPadding } = useStyles();

  const [showAddGroupForm, setShowAddGroupForm] = useState(false);

  const showForm = useCallback(() => setShowAddGroupForm(true), [setShowAddGroupForm]);

  return (
    <Container maxWidth="sm">
      <Grid container className={gridContainerPadding} justifyContent="center" alignItems="center" direction="column" spacing={4}>
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
                <Typography>Add a new group to get started!</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button onClick={showForm} variant="outlined" startIcon={<Icon path={mdiPlus} size={0.5} />}>Add Group</Button>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}
