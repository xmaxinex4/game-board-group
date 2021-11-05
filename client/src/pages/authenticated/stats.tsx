import React from "react";

import ConstructionIcon from "@mui/icons-material/ConstructionTwoTone";
import { Grid, Typography } from "@mui/material";

import { TabContentContainer } from "../../modules/common/layout/tab-content-container";

export function Stats(): React.ReactElement {
  return (
    <TabContentContainer title="Group Stats">
      <Grid container direction="column" sx={{ padding: "100px" }} justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
          <ConstructionIcon color="primary" sx={{ fontSize: 80 }} />
        </Grid>
        <Grid item>
          <Typography>
            Under Construction
          </Typography>
        </Grid>
      </Grid>
    </TabContentContainer>
  );
}
