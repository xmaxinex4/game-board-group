import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, values } from "lodash";

import GameIcon from "@mui/icons-material/CasinoTwoTone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardTwoTone";

import { Button, Grid, Typography } from "@mui/material";

import { LibraryReponse } from "../../../../src/types/types";

import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { useApi } from "../../hooks/useApi";
import { PageLoadingSpinner } from "../../modules/common/progress/page-loading-spinner";
import { LibraryCardList } from "../../modules/library/card-list";
import { selectedActiveUserGroupMembership } from "../../redux/active-user-group-memberships-slice";
import { selectActiveUserGroupLibrary, setActiveUserGroupLibrary } from "../../redux/active-user-group-library-slice";

export function Library(): React.ReactElement {
  const activeGroupMembership = useSelector(selectedActiveUserGroupMembership);
  const activeLibrary = useSelector(selectActiveUserGroupLibrary);

  const { apiGet } = useApi();
  const dispatch = useDispatch();

  const [loadingLibrary, setLoadingLibrary] = useState(false);

  useEffect(() => {
    if (activeGroupMembership?.group.id) {
      setLoadingLibrary(true);
      apiGet<LibraryReponse>("/library", { groupId: activeGroupMembership.group.id })
        .then(({ data }) => {
          dispatch(setActiveUserGroupLibrary({ newLibrary: data }));
        })
        .finally(() => setLoadingLibrary(false));
    }
  }, [activeGroupMembership]);

  return (
    <TabContentContainer title="Group Library">
      {loadingLibrary && (
        <PageLoadingSpinner />
      )}
      {!loadingLibrary && !isEmpty(activeLibrary?.library) && (
        <LibraryCardList games={values(activeLibrary.library)} />
      )}
      {!loadingLibrary && isEmpty(activeLibrary?.library) && (
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
            <Button endIcon={<ArrowForwardIcon />} onClick={() => console.log("Add library")} variant="outlined">Go To Add Game Collections</Button>
          </Grid>
        </Grid>
      )}
    </TabContentContainer>
  );
}
