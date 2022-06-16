import React from "react";

import { Grid } from "@mui/material";

import { Poll } from "@prisma/client";
import { PollCard } from "./card";

export interface PollCardListProps {
  polls: Poll[];
}

export function PollCardList(props: PollCardListProps): React.ReactElement {
  const { polls } = props;

  return (
    <Grid spacing={4} direction="column" container>
      {polls.map((poll) => (
        <Grid item key={`poll-card-list-poll-id-${poll.id}`}>
          <PollCard poll={poll} />
        </Grid>
      ))}
    </Grid>
  );
}
