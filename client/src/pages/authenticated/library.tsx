import React from "react";

import { mdiPlus, mdiFilterVariant, mdiRefresh } from "@mdi/js";
import Icon from "@mdi/react";

import {
  Grid,
  IconButton,
  Switch,
} from "@mui/material";

import { ActiveGroupContext } from "../../contexts/active-group-context";
import { TextButton } from "../../modules/common/button/text-button";
import { TabContentContainer } from "../../modules/common/layout/tab-content-container";

export function Library(): React.ReactElement {
  const activeGroupContext = React.useContext(ActiveGroupContext);
  const [myGamesOnly, setMyGamesOnly] = React.useState(false);

  const toggleMyGamesOnly = () => setMyGamesOnly(!myGamesOnly);

  return (
    <TabContentContainer title={activeGroupContext?.activeGroup?.name} subTitle="Group Library">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <TextButton onClick={() => console.log("add new Game")} icon={mdiPlus} text="Add Game" />
        </Grid>
        <Grid item>
          <Switch
            checked={myGamesOnly}
            onChange={toggleMyGamesOnly}
          />
          <IconButton onClick={() => console.log("open filter")}>
            <Icon path={mdiFilterVariant} size={1} />
          </IconButton>
          <IconButton onClick={() => console.log("refresh")}>
            <Icon path={mdiRefresh} size={1} />
          </IconButton>
        </Grid>
      </Grid>
    </TabContentContainer>
  );
}
