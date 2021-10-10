import React from "react";

import { Button, Grid } from "@mui/material";

import { Poll } from "../../api-types/poll";

export interface PollDisplayProps {
  poll: Poll;
  onDelete: () => void;
}

export function PollDisplay(props: PollDisplayProps): React.ReactElement {
  const { onDelete, poll } = props;

  return (
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
        <Button onClick={onDelete}>
          Delete
        </Button>
      </div>
    </Grid>
  );
};
