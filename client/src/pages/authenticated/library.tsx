import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { selectActiveGroup } from "../../modules/group/redux/slice";
import { useApi } from "../../hooks/useApi";
import { LibraryReponse } from "../../api-types/response-types";
import { PageLoadingSpinner } from "../../modules/common/progress/page-loading-spinner";
import { LibraryGame } from "../../modules/library/types";
import { LibraryCardList } from "../../modules/library/card-list";

export function Library(): React.ReactElement {
  const activeGroup = useSelector(selectActiveGroup);

  const [groupLibrary, setGroupLibrary] = useState<LibraryGame[]>([]);
  const [loadingCollections, setLoadingCollections] = useState(false);

  const { apiGet } = useApi();

  const getLibrary = useCallback((activeGroupId: string) => {
    setLoadingCollections(true);
    apiGet<LibraryReponse>("/library", { groupId: activeGroupId })
      .then(({ data }) => setGroupLibrary(Object.values(data.library)))
      .finally(() => setLoadingCollections(false));
  }, [setLoadingCollections]);

  // run once on page load and when active group changes
  useEffect(() => {
    getLibrary(activeGroup?.id || "");
  }, [activeGroup]);

  return (
    <TabContentContainer title="Group Library">
      {loadingCollections && (
        <PageLoadingSpinner />
      )}
      {!loadingCollections && groupLibrary?.length > 0 && (
        <LibraryCardList games={groupLibrary} />
      )}
    </TabContentContainer>
  );
}
