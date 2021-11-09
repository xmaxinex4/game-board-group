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

import LeaveIcon from "@mui/icons-material/MeetingRoomTwoTone";

import { UserMembershipResponse } from "../../../../../src/types/types";
import { ActionButtons } from "../../common/button/action-buttons";
import { useDeleteGroupMember } from "./endpoint-hooks";
import { selectedActiveUserGroupMembership } from "../../../redux/active-user-group-memberships-slice";

export interface LeaveGroupButtonProps {
  membership: UserMembershipResponse;
  activeGroupMemberships: UserMembershipResponse[];
}

export function LeaveGroupButton(props: LeaveGroupButtonProps): React.ReactElement {
  const { membership, activeGroupMemberships } = props;
  const activeUserGroupMembership = useSelector(selectedActiveUserGroupMembership);

  const [deletingCurrentUserFromGroup, setDeletingCurrentUserFromGroup] = useState(false);
  const [showForbiddenMessage, setShowForbiddenMessage] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const { deleteGroupMember } = useDeleteGroupMember();

  const deleteMember = useCallback(() => {
    deleteGroupMember({
      activeUserGroupMembershipId: activeUserGroupMembership?.id || "",
      memberGroupMembershipId: membership.id,
      setIsLoading: setDeletingCurrentUserFromGroup,
    });
  }, [activeUserGroupMembership, setDeletingCurrentUserFromGroup]);

  const verifyDelete = useCallback(() => {
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
      <Tooltip title="Leave Group" aria-label="leave-group">
        <IconButton
          onClick={verifyDelete}
          disabled={deletingCurrentUserFromGroup}
          color="primary"
          aria-label="leave active group"
          component="span"
        >
          <LeaveIcon />
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
          <Typography>Are you sure you want to leave this group?</Typography>
        </DialogContent>
        <DialogActions sx={{ padding: "24px", paddingTop: "16px" }}>
          <ActionButtons
            onSave={deleteMember}
            saveButtonProps={{ disabled: deletingCurrentUserFromGroup, color: "error" }}
            saveText="Leave Group"
            onCancel={closeVerificationMessage}
            cancelButtonProps={{ disabled: deletingCurrentUserFromGroup }}
            saveButtonSize={6}
            cancelButtonSize={4}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
