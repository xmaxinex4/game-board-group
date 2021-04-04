import * as React from 'react'
import { useQuery } from "react-apollo";

import { mdiPlus } from "@mdi/js";
import { mdiFilterVariant } from '@mdi/js';
import { mdiRefresh } from '@mdi/js';

import { ActiveUserContext, ActiveGroupContext } from "../Contexts";
import { Grid, Typography, Table, TableHead, TableRow, TableCell, TableBody, Tabs, Tab, IconButton } from "@material-ui/core";
import { GroupPolls, GROUP_POLLS } from "../Queries/GroupPolls.query";
import { TextButton } from "../Common/Form";
import Icon from "@mdi/react";

export const Polls: React.FunctionComponent = () => {
  const activeUserContext = React.useContext(ActiveUserContext);
  const activeGroupContext = React.useContext(ActiveGroupContext);

  const { loading, error, data } = useQuery<GroupPolls>(GROUP_POLLS);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h6">{activeGroupContext.activeGroup.name} Polls</Typography>
      </Grid>
      <Grid container item justify="space-between" alignItems="center">
        <Grid item>
          <TextButton onClick={() => console.log("create new poll")} icon={mdiPlus} text="Create Poll" />
        </Grid>
        <Grid item>
          <IconButton onClick={() => console.log("open filter")}>
            <Icon path={mdiFilterVariant} size={1} />
          </IconButton>
          <IconButton onClick={() => console.log("refresh")}>
            <Icon path={mdiRefresh} size={1} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  )
}