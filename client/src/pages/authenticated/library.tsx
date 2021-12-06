import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { isEmpty } from "lodash";

import GameIcon from "@mui/icons-material/CasinoTwoTone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardTwoTone";

import { Button, Grid, Typography } from "@mui/material";

import { selectedActiveUserGroupMembership } from "../../redux/active-user-group-memberships-slice";
import { selectActiveUserGroupLibrary } from "../../redux/active-user-group-library-slice";
import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { PageLoadingSpinner } from "../../modules/common/progress/page-loading-spinner";
import { LibraryCardList } from "../../modules/library/card-list";
import { useGetLibrary } from "../../modules/library/endpoint-hooks";

export function Library(): React.ReactElement {
  const activeGroupMembership = useSelector(selectedActiveUserGroupMembership);
  const activeLibrary = useSelector(selectActiveUserGroupLibrary);

  const { getLibrary } = useGetLibrary();
  const history = useHistory();

  const [loadingLibrary, setLoadingLibrary] = useState(false);

  useEffect(() => {
    if (activeGroupMembership?.group.id && activeGroupMembership?.group.id !== activeLibrary.groupId) {
      getLibrary({
        setIsLoading: setLoadingLibrary,
      });
    }
  }, [activeGroupMembership]);

  const goToGameCollections = () => history.push("/my-game-collections");

  return (
    <TabContentContainer title="Group Library">
      {loadingLibrary && (
        <PageLoadingSpinner />
      )}
      {!loadingLibrary && !isEmpty(activeLibrary.activeUserGroupLibrary) && (
        <LibraryCardList
          games={activeLibrary.activeUserGroupLibrary}
        />
      )}
      {!loadingLibrary && isEmpty(activeLibrary) && (
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <GameIcon fontSize="large" color="primary" />
          </Grid>
          <Grid item>
            <Typography>
              Create your own game collection to display in the group library
            </Typography>
          </Grid>
          <Grid item>
            <Button endIcon={<ArrowForwardIcon />} onClick={goToGameCollections} variant="outlined">Go To Add Game Collections</Button>
          </Grid>
        </Grid>
      )}
    </TabContentContainer>
  );
}
