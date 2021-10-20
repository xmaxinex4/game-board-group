import React from "react";
// import { useSelector } from "react-redux";

import { Button } from "@mui/material";

import { TextButton } from "../common/button/text-button";

export interface AddGroupButtonProps {
  variant?: "text" | null;
}

export function AddGroupButton(props: AddGroupButtonProps): React.ReactElement {
  const { variant } = props;

  // const onCreateGroupError = (error: ApolloError) => {
  //   // TODO: Handle error
  //   console.log("create group error: ", error);
  // }

  // const onCreateGroupCompleted = (data: any) => {
  //   // TODO: Show success snackbar
  //   window.location.href = "/manage-group";
  //   console.log("create group success", data)
  // }

  // const [createGroup, createGroupResults] = useMutation(CREATE_GROUP, { onError: onCreateGroupError, onCompleted: onCreateGroupCompleted });

  const onAddGroup = () => {
    console.log("onAddGroup");
    // createGroup({ variables: { name: `${activeUser.username}"s game group` } });
  };

  return (
    (variant === "text")
      ? <TextButton text="+ Add Group" onClick={onAddGroup} />
      : <Button onClick={onAddGroup}>+ Add Group</Button>
  );
}
