import React from "react";

import { ActiveGroupContext } from "../../contexts/active-group-context";
import { TabContentContainer } from "../../modules/common/layout/tab-content-container";

export function ManageGroup(): React.ReactElement {
  const activeGroupContext = React.useContext(ActiveGroupContext);

  return (
    <TabContentContainer title={`Managing ${activeGroupContext?.activeGroup?.name} Group`}>
      MANAGE GROUP CONTENT
    </TabContentContainer>
  );
}
