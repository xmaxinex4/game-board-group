import * as React from 'react';
import { useMutation } from "react-apollo";
import { ApolloError } from "apollo-boost";

import { mdiPlus } from "@mdi/js";
import { FormControl, MenuItem, Select } from "@material-ui/core";

import { ActiveGroupContext, ActiveUserContext } from "../../../Contexts";
import { TextButton } from "../../../Common/Form";

import { CREATE_GROUP } from "./Mutations";

export const ActiveGroupSelector: React.FunctionComponent =
  () => {
    const { activeGroup, setActiveGroup } = React.useContext(ActiveGroupContext);
    const { activeUser } = React.useContext(ActiveUserContext);

    const onCreateGroupError = (error: ApolloError) => {
      // TODO: Handle error
      console.log("create group error: ", error);
    }

    const onCreateGroupCompleted = (data: any) => {
      // TODO: Show success snackbar
      // window.location.href = "/manage-group";
      console.log("create account success", data)
    }

    const [createGroup, createGroupResults] = useMutation(CREATE_GROUP, { onError: onCreateGroupError, onCompleted: onCreateGroupCompleted });

    const onActiveGroupChanged = (event: React.ChangeEvent<{ name?: string; value: unknown; }>, child: React.ReactNode) => {
      console.log("event: ", event);
    }

    const onAddGroup = () => {
      createGroup({ variables: { name: `${activeUser.username}'s game group`, userId: activeUser.id } });
    }

    return (
      <>
        {activeUser.groupMemberships ?
          <FormControl variant="outlined">
            <Select
              onChange={onActiveGroupChanged}
              value={activeGroup ? activeGroup.id : null}
              inputProps={{
                name: 'active group',
                id: 'group-select',
              }}
            >
              {activeUser.groupMemberships.map((groupMembership, index) => (
                <MenuItem value={groupMembership.group.id}>{groupMembership.group.name}</MenuItem>
              ))}
              <MenuItem value={20}>Twenty</MenuItem>
            </Select>
          </FormControl>
          :
          <TextButton text="Add Group" icon={mdiPlus} onClick={onAddGroup} />
        }
      </>
    )
  }