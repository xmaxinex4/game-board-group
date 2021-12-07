import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
  Theme,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import TransferIcon from "@mui/icons-material/CompareArrowsTwoTone";

import { UserMembershipResponse } from "../../../../../src/types/types";
import { selectedActiveUserGroupMembership } from "../../../redux/active-user-group-memberships-slice";
import { MeeplePaletteColors } from "../../../theme/meeple-palettes";
import { selectActiveUser } from "../../../redux/active-user-slice";
import { ActionButtons } from "../../common/button/action-buttons";

import { useTransferGroupOwnership } from "./endpoint-hooks";

export interface TransferGroupOwnershipButtonProps {
  currentOwnerGroupMembership: UserMembershipResponse;
}

export function TransferActiveGroupOwnershipButton(props: TransferGroupOwnershipButtonProps): React.ReactElement {
  const { currentOwnerGroupMembership } = props;
  const activeUserGroupMembership = useSelector(selectedActiveUserGroupMembership);
  const activeUser = useSelector(selectActiveUser);

  const theme = useTheme<Theme>();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [newOwnerGroupMembershipId, setNewOwnerGroupMembershipId] = useState("");
  const [transfferingOwnership, setTransfferingOwnership] = useState(false);
  const [showTranferDialog, setShowTransferDialog] = useState(false);
  const [transferError, setTransferError] = useState("");

  const { transferGroupOwnership } = useTransferGroupOwnership();

  const onTransferError = useCallback((error: string) => {
    if (error === "Users can only have 2 groups and this user already has 2.") {
      setTransferError(error);
    } else {
      setTransferError("Something went wrong, please try again.");
    }
  }, [setTransferError]);

  const tranferOwnership = useCallback(() => {
    if (newOwnerGroupMembershipId) {
      transferGroupOwnership({
        newOwnerGroupMembershipId,
        setIsLoading: setTransfferingOwnership,
        onError: onTransferError,
      });
    }
  }, [setTransfferingOwnership, newOwnerGroupMembershipId]);

  const openTranferDialog = useCallback(() => {
    setTransferError("");
    setNewOwnerGroupMembershipId("");
    setShowTransferDialog(true);
  }, [setShowTransferDialog, setTransferError, setShowTransferDialog]);

  const closeTranferDialog = useCallback(() => {
    setShowTransferDialog(false);
  }, [setShowTransferDialog]);

  const onNewOwnerChange = useCallback((event: any) => {
    setTransferError("");
    setNewOwnerGroupMembershipId(event.target.value);
  }, [setNewOwnerGroupMembershipId, setTransferError]);

  return (
    <>
      <Tooltip title="Transfer Ownership" aria-label="transfer-ownership">
        <IconButton
          onClick={openTranferDialog}
          color="primary"
          aria-label="transfer ownership"
        >
          <TransferIcon sx={{ color: MeeplePaletteColors[currentOwnerGroupMembership.user.color].main }} />
        </IconButton>
      </Tooltip>
      <Dialog
        onClose={closeTranferDialog}
        open={showTranferDialog}
        sx={{ ".MuiDialog-container": isMdUp ? { marginTop: "64px", height: "unset" } : {} }}
      >
        <DialogTitle>
          <Typography>{`Tranfer Ownership of ${activeUserGroupMembership?.group.name}`}</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" sx={{ paddingTop: transferError ? "" : "16px" }} spacing={4} alignItems="center" justifyContent="center">
            {activeUserGroupMembership && (
              <>
                {activeUserGroupMembership?.group?.members?.length > 1 && (
                  <>
                    {transferError && (
                      <Grid item>
                        <Alert severity="error">{transferError}</Alert>
                      </Grid>
                    )}
                    <Grid item>
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
                        <InputLabel id="new-owner-select">Tranfer To</InputLabel>
                        <Select
                          labelId="new-owner-select"
                          onChange={onNewOwnerChange}
                          value={newOwnerGroupMembershipId}
                          label="Active Group"
                          inputProps={{
                            name: "active group",
                            id: "group-select",
                          }}
                        >
                          {activeUserGroupMembership.group.members.map((groupMembership) => {
                            if (groupMembership.user.id !== activeUser?.id) {
                              return (
                                <MenuItem
                                  key={`menu-item-group-membership-id-${groupMembership.id}`}
                                  value={groupMembership.id}
                                >
                                  <Typography variant="inherit" noWrap>
                                    {groupMembership.user.username}
                                  </Typography>
                                </MenuItem>
                              );
                            }
                            return null;
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                )}
                {!(activeUserGroupMembership?.group?.members?.length > 1) && (
                  <Grid item>
                    <Typography>
                      There are no other group members to tranfer ownership to. Please invite new group members to join and try again.
                    </Typography>
                  </Grid>
                )}
              </>
            )}
            {!activeUserGroupMembership && (
              <Grid item>
                <Typography>
                  No active group is selected
                </Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ padding: "24px", paddingTop: "16px" }}>
          <ActionButtons
            onSave={(activeUserGroupMembership && activeUserGroupMembership?.group?.members?.length > 1) ? tranferOwnership : undefined}
            saveButtonProps={{ disabled: transfferingOwnership }}
            saveText="Transfer"
            onCancel={closeTranferDialog}
            cancelButtonProps={{ disabled: transfferingOwnership }}
            saveButtonSize={6}
            cancelButtonSize={4}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
