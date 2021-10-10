import React from "react";

import { Grid } from "@mui/material";

import { Poll } from "../../api-types/poll";

import { PollCard } from "./card";

export interface PollCardListProps {
  polls: Poll[];
}

export function CreateGroupForm(props: PollCardListProps): React.ReactElement {
  const { polls } = props;

  return (
    <Grid spacing={4} direction="column" container>
      {polls.map((poll) =>
        <Grid item>
          <PollCard poll={poll} />
        </Grid>
      )}
    </Grid>
  );
}
