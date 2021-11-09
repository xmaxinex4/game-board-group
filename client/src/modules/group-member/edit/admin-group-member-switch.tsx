import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";

import { UserMembershipResponse } from "../../../../../src/types/types";
import { selectActiveUser } from "../../../redux/active-user-slice";
import { ActionButtons } from "../../common/button/action-buttons";
import { useEditGroupMember } from "./endpoint-hooks";
import { selectedActiveUserGroupMembership } from "../../../redux/active-user-group-memberships-slice";

export interface AdminGroupMemberSwitchProps {
  membership: UserMembershipResponse;
  activeGroupMemberships: UserMembershipResponse[];
}

export function AdminGroupMemberSwitch(props: AdminGroupMemberSwitchProps): React.ReactElement {
  const { membership, activeGroupMemberships } = props;
  const activeUser = useSelector(selectActiveUser);
  const activeUserGroupMembership = useSelector(selectedActiveUserGroupMembership);

  const isCurrentUser = useMemo(() => membership.user.id === activeUser?.id, [activeUser, membership]);

  const [isAdmin, setIsAdmin] = useState(membership.isAdmin);
  const [editingAdminStatus, setIsEditingAdminStatus] = useState(false);
  const [showForbiddenMessage, setShowForbiddenMessage] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const { editAdminStatusOfGroupMember } = useEditGroupMember();
  const toggleIsAdmin = useCallback(() => setIsAdmin(!isAdmin), [isAdmin, setIsAdmin]);

  const onChange = useCallback(() => {
    editAdminStatusOfGroupMember({
      activeUserGroupMembershipId: activeUserGroupMembership?.id || "",
      memberGroupMembershipId: membership.id,
      isAdmin: !isAdmin,
      onAdminStatusUpdated: toggleIsAdmin,
      setIsLoading: setIsEditingAdminStatus,
    });
  }, [setIsEditingAdminStatus, toggleIsAdmin]);

  const verifyChangeOfAdminStatus = useCallback(() => {
    const isLastAdmin = isAdmin && activeGroupMemberships.filter((member) => member.isAdmin).length < 2;
    if (isLastAdmin) {
      setShowForbiddenMessage(true);
    } else if (isCurrentUser) {
      setShowVerificationMessage(true);
    } else {
      onChange();
    }
  }, [onChange, setShowVerificationMessage, setShowForbiddenMessage, activeGroupMemberships]);

  const closeForbiddenMessage = useCallback(() => {
    setShowForbiddenMessage(false);
  }, [setShowForbiddenMessage]);

  const closeVerificationMessage = useCallback(() => {
    setShowVerificationMessage(false);
  }, [setShowVerificationMessage]);

  return (
    <>
      <FormControlLabel
        control={<Switch disabled={editingAdminStatus} checked={isAdmin} onClick={verifyChangeOfAdminStatus} />}
        label="Admin"
      />
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
          <Typography>
            Are you sure you want to revoke your own admin status?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: "24px", paddingTop: "16px" }}>
          <ActionButtons
            onSave={onChange}
            saveButtonProps={{ disabled: editingAdminStatus, color: "error" }}
            saveText="Revoke my admin status"
            onCancel={closeVerificationMessage}
            cancelButtonProps={{ disabled: editingAdminStatus }}
            saveButtonSize={7}
            cancelButtonSize={3}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
