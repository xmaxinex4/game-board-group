import * as React from "react";
import { compose } from "recompose";

import { Grid, Card, CardContent, Typography } from "@material-ui/core";

import { Poll } from "../../Models/Poll";
import { PollOptionDisplay } from "../../PollOption/Components/PollOptionDisplay";

export interface IPollDisplayProps {
  poll: Poll;
}

export const PollCard = compose<IPollDisplayProps, IPollDisplayProps>(
)(({ poll }) => (
  <Card>
    <CardContent>
      <Grid container>
        <Grid item container justify="space-between">
          <Grid item>
            <Typography variant="h6">
              {poll.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              Created By: {poll.author.username}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container justify="space-between">
          {poll.pollOptions.map((option) =>
            <Grid item>
              <PollOptionDisplay option={option} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </CardContent >
  </Card >
))