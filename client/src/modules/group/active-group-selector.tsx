import React, { useContext } from "react";
import { mdiPlus } from "@mdi/js";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import Icon from "@mdi/react";

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
    console.log("event: ", event);
  };

  const onAddGroup = () => {
    console.log("onAddGroup");
    // createGroup({ variables: { name: `${activeUser.username}"s game group`, userId: activeUser.id } });
  };

  return (
    <>
      {
        activeUser?.groupMemberships
          ? (
            <FormControl variant="outlined">
              <Select
                onChange={onActiveGroupChanged}
                value={activeGroup ? activeGroup.id : null}
                inputProps={{
                  name: "active group",
                  id: "group-select",
                }}
              >
                {activeUser.groupMemberships.map((groupMembership) => (
                  <MenuItem value={groupMembership.group.id}>{groupMembership.group.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : <Button variant="outlined" onClick={onAddGroup} startIcon={<Icon path={mdiPlus} size={0.5} />}>Add Group</Button>
      }
    </>
  );
}
