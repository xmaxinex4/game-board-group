import * as React from 'react';
import { useMutation } from "react-apollo";
import { ApolloError } from "apollo-boost";

import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { Button } from "@material-ui/core";

import { ActiveGroupContext, ActiveUserContext } from "../../../Contexts";
import { TextButton } from "../../../Common/Form";

import { CREATE_GROUP } from "../Mutations/CreateGroup.mutation";

export interface AddGroupButtonProps {
  variant?: "text" | null;
}

export const AddGroupButton: React.FunctionComponent<AddGroupButtonProps> =
  ({ variant }) => {
    const { activeGroup, setActiveGroup } = React.useContext(ActiveGroupContext);
    const { activeUser } = React.useContext(ActiveUserContext);

    const onCreateGroupError = (error: ApolloError) => {
      // TODO: Handle error
      console.log("create group error: ", error);
    }

    const onCreateGroupCompleted = (data: any) => {
      // TODO: Show success snackbar
      window.location.href = "/manage-group";
      console.log("create group success", data)
    }

    const [createGroup, createGroupResults] = useMutation(CREATE_GROUP, { onError: onCreateGroupError, onCompleted: onCreateGroupCompleted });

    const onAddGroup = () => {
      createGroup({ variables: { name: `${activeUser.username}'s game group` } });
    }

    return (
      (variant === "text")
        ?
        <TextButton text="Add Group" icon={mdiPlus} onClick={onAddGroup} />
        :
        <Button startIcon={<Icon path={mdiPlus} />} onClick={onAddGroup}>Add Group</Button>
    )
  }