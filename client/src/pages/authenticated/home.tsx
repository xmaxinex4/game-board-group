import React from "react";
import { useSelector } from "react-redux";

import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { selectedActiveUserGroupMembership } from "../../redux/active-user-group-memberships-slice";

export function Home(): React.ReactElement {
  const activeGroupMembership = useSelector(selectedActiveUserGroupMembership);

  return (
    <TabContentContainer title={`${activeGroupMembership?.group.name}`}>
      HOME CONTENT
    </TabContentContainer>
  );
}
