import React from "react";

import {
  Grid, Card, CardContent, Typography,
} from "@mui/material";

// import { PollOptionDisplay } from "../poll-option/poll-option-display";
import { Poll } from "@prisma/client";

export interface PollDisplayProps {
  poll: Poll;
}

export function PollCard(props: PollDisplayProps): React.ReactElement {
  const { poll } = props;

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item container justifyContent="space-between">
            <Grid item>
              <Typography variant="h6">
                {poll.title}
              </Typography>
            </Grid>
            {/* <Grid item>
              <Typography variant="h6">
                Created By: {poll.author.username}
              </Typography>
            </Grid> */}
          </Grid>
          {/* <Grid item container justifyContent="space-between">
            {poll.pollOptions.map((option) =>
              <Grid item key={`poll-card-option-display-poll-id-${option.id}`}>
                <PollOptionDisplay option={option} />
              </Grid>
            )}
          </Grid> */}
        </Grid>
      </CardContent>
    </Card>
  );
}
