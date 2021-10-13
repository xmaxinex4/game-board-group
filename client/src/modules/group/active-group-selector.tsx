import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

import { selectActiveUser } from "../user/redux/slice";
import { selectActiveGroup, setActiveGroupId } from "./redux/slice";

export function ActiveGroupSelector(): React.ReactElement {
  const activeUser = useSelector(selectActiveUser);
  const activeGroup = useSelector(selectActiveGroup);
  const dispatch = useDispatch();

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
    // TODO: dont do this if add group was selected
    dispatch(setActiveGroupId({
      id: event.target.value,
    }));
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
          <MenuItem
            key={`menu-item-group-id-${groupMembership.group.id}`}
            value={groupMembership.group.id}
          >
            {groupMembership.group.name}
          </MenuItem>
        ))}
        <MenuItem onClick={onAddGroup}>+ Add Group</MenuItem>
      </Select>
    </FormControl>
  );
}
