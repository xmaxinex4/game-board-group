import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, values } from "lodash";

import { Typography } from "@mui/material";

import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { useApi } from "../../hooks/useApi";
import { PageLoadingSpinner } from "../../modules/common/progress/page-loading-spinner";
import { LibraryCardList } from "../../modules/library/card-list";
import { LibraryReponse } from "../../types";
import { selectedActiveUserGroupMembership } from "../../redux/active-user-group-memberships-slice";
import { selectActiveUserGroupLibrary, setActiveUserGroupLibrary } from "../../redux/active-user-group-library-slice";

export function Library(): React.ReactElement {
  const activeGroupMembership = useSelector(selectedActiveUserGroupMembership);
  const activeLibrary = useSelector(selectActiveUserGroupLibrary);

  const { apiGet } = useApi();
  const dispatch = useDispatch();

  const [loadingLibrary, setLoadingLibrary] = useState(false);

  useEffect(() => {
    if (isEmpty(activeLibrary.library) && activeGroupMembership?.group.id) {
      setLoadingLibrary(true);
      apiGet<LibraryReponse>("/library", { groupId: activeGroupMembership.group.id })
        .then(({ data }) => {
          dispatch(setActiveUserGroupLibrary({ newLibrary: data }));
        })
        .finally(() => setLoadingLibrary(false));
    }
  }, [activeLibrary, activeGroupMembership]);

  return (
    <TabContentContainer title="Group Library">
      {loadingLibrary && (
        <PageLoadingSpinner />
      )}
      {!loadingLibrary && !isEmpty(activeLibrary?.library) && (
        <LibraryCardList games={values(activeLibrary.library)} />
      )}
      {!loadingLibrary && isEmpty(activeLibrary?.library) && (
        <Typography>No game in library placeholder</Typography>
      )}
    </TabContentContainer>
  );
}
