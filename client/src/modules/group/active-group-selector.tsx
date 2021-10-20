import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import {
  activeUserGroupMemberships,
  setSelectedActiveUserGroupMembershipId,
  selectedActiveUserGroupMembership,
} from "../../redux/active-user-group-memberships-slice";

export function ActiveGroupSelector(): React.ReactElement {
  const userGroupMemberships = useSelector(activeUserGroupMemberships);
  const activeGroupMembership = useSelector(selectedActiveUserGroupMembership);

  console.log("activeGroupMembership: ", activeGroupMembership);

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
      localStorage.setItem("gbg-selected-active-user-group-membership", event.target.value);

      dispatch(setSelectedActiveUserGroupMembershipId({
        id: event.target.value,
      }));
    }
  }, []);

  return (
    <FormControl
      sx={{
        maxWidth: {
          xs: "200px",
          sm: "400px",
        },
        minWidth: {
          xs: "200px",
        },
      }}
      variant="outlined"
    >
      <InputLabel id="active-group-select">Active Group</InputLabel>
      <Select
        labelId="active-group-select"
        onChange={onActiveGroupChanged}
        value={activeGroupMembership ? activeGroupMembership.id : ""}
        label="Active Group"
        inputProps={{
          name: "active group",
          id: "group-select",
        }}
      >
        {userGroupMemberships && userGroupMemberships?.groupMemberships?.map((groupMembership) => (
          <MenuItem
            key={`menu-item-group-id-${groupMembership.id}`}
            value={groupMembership.id}
          >
            <Typography variant="inherit" noWrap>
              {groupMembership.group.name}
            </Typography>
          </MenuItem>
        ))}
        <MenuItem value="Add Group">+ Add Group</MenuItem>
      </Select>
    </FormControl>
  );
}
