import React from "react";
import { useSelector } from "react-redux";

import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { selectActiveGroup } from "../../modules/group/redux/slice";

export function Stats(): React.ReactElement {
  const activeGroup = useSelector(selectActiveGroup);

  return (
    <TabContentContainer title={activeGroup?.name} subTitle="Group Stats">
      STATS HERE
    </TabContentContainer>
  );
}
