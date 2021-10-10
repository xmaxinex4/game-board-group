import React, { useContext } from "react";

import {
  ListItemIcon,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import Plus from "@mui/icons-material/PlusOne";

import { ActiveGroupContext } from "../../contexts/active-group-context";
import { ActiveUserContext } from "../../contexts/active-user-context";

export function ActiveGroupSelector(): React.ReactElement {
  const { activeGroup } = useContext(ActiveGroupContext);
  const { activeUser } = useContext(ActiveUserContext);

  // const onCreateGroupError = (error: ApolloError) => {
  //   // TODO: Handle error
  //   console.log("create group error: ", error);
  // }

  // const onCreateGroupCompleted = (data: any) => {
  //   // TODO: Show success snackbar
  //   // window.location.href = "/manage-group";
  //   console.log("create account success", data)
  // }

  // const [createGroup, createGroupResults] = useMutation(CREATE_GROUP, { onError: onCreateGroupError, onCompleted: onCreateGroupCompleted });

  const onActiveGroupChanged = (event: any) => {
    console.log("change active group: ", event);
  };

  const onAddGroup = () => {
    console.log("open add group form");
    // createGroup({ variables: { name: `${activeUser.username}"s game group`, userId: activeUser.id } });
  };

  return (
    <FormControl variant="outlined">
      <Select
        onChange={onActiveGroupChanged}
        value={activeGroup ? activeGroup.id : null}
        inputProps={{
          name: "active group",
          id: "group-select",
        }}
      >
        {activeUser?.groupMemberships && activeUser?.groupMemberships?.map((groupMembership) => (
          <MenuItem onClick={onActiveGroupChanged} value={groupMembership.group.id}>{groupMembership.group.name}</MenuItem>
        ))}
        <MenuItem onClick={onAddGroup}>
          <ListItemIcon>
            <Plus />
          </ListItemIcon>
          Add Group
        </MenuItem>
      </Select>
    </FormControl>
  );
}
