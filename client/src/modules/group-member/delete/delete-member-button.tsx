import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/DeleteTwoTone";

import { UserMembershipResponse } from "../../../../../src/types/types";
import { ActionButtons } from "../../common/button/action-buttons";
import { useDeleteGroupMember } from "./endpoint-hooks";
import { selectedActiveUserGroupMembership } from "../../../redux/active-user-group-memberships-slice";

export interface DeleteMemberButtonProps {
  membership: UserMembershipResponse;
  activeGroupMemberships: UserMembershipResponse[];
}

export function DeleteMemberButton(props: DeleteMemberButtonProps): React.ReactElement {
  const { membership, activeGroupMemberships } = props;
  const activeUserGroupMembership = useSelector(selectedActiveUserGroupMembership);

  const [removingMember, setRemovingMember] = useState(false);
  const [showForbiddenMessage, setShowForbiddenMessage] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const { deleteGroupMember } = useDeleteGroupMember();

  const deleteMember = useCallback(() => {
    deleteGroupMember({
      memberGroupMembershipId: membership.id,
      setIsLoading: setRemovingMember,
    });
  }, [setRemovingMember, activeUserGroupMembership]);

  const verifyDeleteMember = useCallback(() => {
    const isLastAdmin = membership.isAdmin && activeGroupMemberships.filter((member) => member.isAdmin).length < 2;
    if (isLastAdmin) {
      setShowForbiddenMessage(true);
    } else {
      setShowVerificationMessage(true);
    }
  }, [setShowVerificationMessage, setShowForbiddenMessage, activeGroupMemberships]);

  const closeForbiddenMessage = useCallback(() => {
    setShowForbiddenMessage(false);
  }, [setShowForbiddenMessage]);

  const closeVerificationMessage = useCallback(() => {
    setShowVerificationMessage(false);
  }, [setShowVerificationMessage]);

  return (
    <>
      <Tooltip title="Remove Member" aria-label="remove-group-member">
        <IconButton
          onClick={verifyDeleteMember}
          disabled={removingMember}
          color="primary"
          aria-label="remove group member"
          component="span"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        onClose={closeForbiddenMessage}
        open={showForbiddenMessage}
        sx={{ ".MuiDialog-container": { marginTop: "64px", height: "unset" } }}
      >
        <DialogContent>
          <Typography>
            Cannot delete the last admin in a group. Please promote a different group member to admin, then try again.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: "24px", paddingTop: "16px" }}>
          <ActionButtons
            cancelText="Close"
            onCancel={closeForbiddenMessage}
          />
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={closeVerificationMessage}
        open={showVerificationMessage}
        sx={{ ".MuiDialog-container": { marginTop: "64px", height: "unset" } }}
      >
        <DialogContent>
          <Typography>Are you sure you want to remove this user from the group?</Typography>
        </DialogContent>
        <DialogActions sx={{ padding: "24px", paddingTop: "16px" }}>
          <ActionButtons
            onSave={deleteMember}
            saveButtonProps={{ disabled: removingMember, color: "error" }}
            saveText="Remove Group Member"
            onCancel={closeVerificationMessage}
            cancelButtonProps={{ disabled: removingMember }}
            saveButtonSize={7}
            cancelButtonSize={3}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
