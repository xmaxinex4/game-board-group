import * as React from "react";
import { compose, withHandlers } from "recompose";

import { Button, Grid } from "@material-ui/core";

import { Poll } from "../../Models/Poll";

export interface IPollDisplayTempProps {
  poll: Poll;
}

interface IPollDisplayTempInternalProps extends IPollDisplayTempProps {
  handleDelete: () => void;
}

export const PollDisplayTemp = compose<IPollDisplayTempInternalProps, IPollDisplayTempProps>(
  withHandlers({
    handleDelete: () => (e: Event) => {
      // TODO: delete poll before reloading polls
      // this.props.refresh()
      console.log("event: ", e);
    }
  }),
)(({ handleDelete, poll }) => (
  <Grid container>
    <div
      className="w-100"
      style={{
        // backgroundImage: `url(${this.props.poll.imageUrl})`,
        backgroundSize: 'cover',
        paddingBottom: '100%',
      }}
    />
    <div className="pt3">
      {poll}
      <Button onClick={handleDelete}>
        Delete
      </Button>
    </div>
  </Grid>
))