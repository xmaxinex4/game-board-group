import * as React from "react";
import { compose, withHandlers } from "recompose";
import { Query } from "react-apollo";

import { Grid } from "@material-ui/core";
import { ALL_OPEN_POLLS, IAllOpenPollsData } from "../../../Queries/AllOpenPolls.query";
import { PollDisplay } from "./card";

export interface IOpenPollListDisplayProps {

}

interface IOpenPollListDisplayInternalProps extends IOpenPollListDisplayProps {
  handleDelete: () => void;
}

export const PollCardList = compose<IOpenPollListDisplayInternalProps, IOpenPollListDisplayProps>(
  withHandlers({
    handleDelete: () => (e: Event) => {
      // TODO: delete poll before reloading polls
      // this.props.refresh()
      console.log("event: ", e);
    }
  }),
)(({ }) => (
  <Grid container>
    <Query<IAllOpenPollsData> query={ALL_OPEN_POLLS}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading...</div>
        }

        return (
          <Grid spacing={4} direction="column" container>
            {data.openPolls.map((poll) =>
              <Grid item>
                <PollDisplay poll={poll} />
              </Grid>
            )}
          </Grid>
        )
      }}
    </Query>
  </Grid>
))