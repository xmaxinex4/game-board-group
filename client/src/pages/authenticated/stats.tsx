import React from "react";

import { ActiveGroupContext } from "../../contexts/active-group-context";
import { TabContentContainer } from "../../modules/common/layout/tab-content-container";

export function Stats(): React.ReactElement {
  const activeGroupContext = React.useContext(ActiveGroupContext);

  return (
    <TabContentContainer title={activeGroupContext?.activeGroup?.name} subTitle="Group Stats">
      STATS HERE
    </TabContentContainer>
  );
}
