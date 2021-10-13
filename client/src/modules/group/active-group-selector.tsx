import React, { useCallback } from "react";
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

  const onActiveGroupChanged = useCallback((event: any) => {
    if (event.target.value === "Add Group") {
      console.log("open add group form");
    } else {
      dispatch(setActiveGroupId({
        id: event.target.value,
      }));
    }
  }, []);

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
        <MenuItem value="Add Group">+ Add Group</MenuItem>
      </Select>
    </FormControl>
  );
}
